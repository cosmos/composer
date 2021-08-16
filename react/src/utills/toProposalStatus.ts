export const toProposalStatus = (status: string | number): string | number => {
    if (+status === 5) return "Failed";
    if (+status === 4) return "Rejected";
    if (+status === 3) return "Passed";
    if (+status === 2) return "Voting Period";
    if (+status === 1) return "Deposit Period";
    if (+status === 0) return "Unspecified";
    return status;
};
