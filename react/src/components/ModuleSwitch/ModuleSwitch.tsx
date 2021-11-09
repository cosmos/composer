import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import { useAdminConnection } from "../../hooks/useAdminConnection";
import { setModule } from "../../redux/action-creator/settings";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { ModuleNames } from "../../types/settings";

const ModuleSwitch = () => {
    const { moduleName } = useTypedSelector((state) => state.settings);
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(isChecked());
    const admConnected = useAdminConnection();

    function isChecked(): boolean {
        return moduleName === ModuleNames.gov;
    }

    function switchModule(checked: boolean) {
        setChecked(checked);
        dispatch(setModule(checked ? ModuleNames.gov : ModuleNames.admin));
    }

    if (!admConnected) {
        return null;
    }

    return (
        <div className="module-switch">
            Admin{" "}
            <Switch
                offColor="#FF1919"
                onColor="#FFA500"
                uncheckedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: "white",
                            paddingRight: 2,
                            fontWeight: "bold"
                        }}>
                        A
                    </div>
                }
                checkedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: "white",
                            paddingLeft: 2,
                            fontWeight: "bold"
                        }}>
                        G
                    </div>
                }
                onChange={switchModule}
                checked={checked}
            />{" "}
            Gov
        </div>
    );
};

export default ModuleSwitch;
