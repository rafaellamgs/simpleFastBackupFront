import * as React from "react";
import Switch from "react-switch";

export default function CustomSwitch({
    id,
    label,
    onChange,
    checked,
    disabled,
}) {
    return (
        <label htmlFor={id}>
            <span style={{ marginRight: "16px" }}>{label}:</span>
            <Switch
                onChange={onChange}
                checked={checked}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={18}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={16}
                width={48}
                className="react-switch"
                id={id}
                disabled={disabled}
            />
        </label>
    );
}
