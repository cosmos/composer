package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/version"
	gcutils "github.com/cosmos/cosmos-sdk/x/gov/client/utils"
	"github.com/cosmos/cosmos-sdk/x/gov/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd() *cobra.Command {
	// Group gov queries under a subcommand
	govQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Querying commands for the governance module",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	govQueryCmd.AddCommand(
		GetCmdQueryProposal(),
		GetCmdQueryProposals(),
	)

	return govQueryCmd
}

// GetCmdQueryProposal implements the query proposal command.
func GetCmdQueryProposal() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "proposal [proposal-id]",
		Args:  cobra.ExactArgs(1),
		Short: "Query details of a single proposal",
		Long: strings.TrimSpace(
			fmt.Sprintf(`Query details for a proposal. You can find the
proposal-id by running "%s query gov proposals".

Example:
$ %s query gov proposal 1
`,
				version.AppName, version.AppName,
			),
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)

			// validate that the proposal id is a uint
			proposalID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("proposal-id %s not a valid uint, please input a valid proposal-id", args[0])
			}

			// Query the proposal
			res, err := queryClient.Proposal(
				cmd.Context(),
				&types.QueryProposalRequest{ProposalId: proposalID},
			)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(&res.Proposal)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

// GetCmdQueryProposals implements a query proposals command. Command to Get a
// Proposal Information.
func GetCmdQueryProposals() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "proposals",
		Short: "Query proposals with optional filters",
		Long: strings.TrimSpace(
			fmt.Sprintf(`Query for a all paginated proposals that match optional filters:

Example:
$ %s query gov proposals --depositor cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39lk
$ %s query gov proposals --voter cosmos1skjwj5whet0lpe65qaq4rpq03hjxlwd9nf39lk
$ %s query gov proposals --status (DepositPeriod|VotingPeriod|Passed|Rejected)
$ %s query gov proposals --page=2 --limit=100
`,
				version.AppName, version.AppName, version.AppName, version.AppName,
			),
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			bechDepositorAddr, _ := cmd.Flags().GetString(flagDepositor)
			bechVoterAddr, _ := cmd.Flags().GetString(flagVoter)
			strProposalStatus, _ := cmd.Flags().GetString(flagStatus)

			var proposalStatus types.ProposalStatus

			if len(bechDepositorAddr) != 0 {
				_, err := sdk.AccAddressFromBech32(bechDepositorAddr)
				if err != nil {
					return err
				}
			}

			if len(bechVoterAddr) != 0 {
				_, err := sdk.AccAddressFromBech32(bechVoterAddr)
				if err != nil {
					return err
				}
			}

			if len(strProposalStatus) != 0 {
				proposalStatus1, err := types.ProposalStatusFromString(gcutils.NormalizeProposalStatus(strProposalStatus))
				proposalStatus = proposalStatus1
				if err != nil {
					return err
				}
			}

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			res, err := queryClient.Proposals(
				cmd.Context(),
				&types.QueryProposalsRequest{
					ProposalStatus: proposalStatus,
					Voter:          bechVoterAddr,
					Depositor:      bechDepositorAddr,
					Pagination:     pageReq,
				},
			)
			if err != nil {
				return err
			}

			if len(res.GetProposals()) == 0 {
				return fmt.Errorf("no proposals found")
			}

			return clientCtx.PrintProto(res)
		},
	}

	cmd.Flags().String(flagDepositor, "", "(optional) filter by proposals deposited on by depositor")
	cmd.Flags().String(flagVoter, "", "(optional) filter by proposals voted on by voted")
	cmd.Flags().String(flagStatus, "", "(optional) filter proposals by proposal status, status: deposit_period/voting_period/passed/rejected")
	flags.AddPaginationFlagsToCmd(cmd, "proposals")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
