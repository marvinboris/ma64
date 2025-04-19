import React from "react";
import FormInput from "../../../../components/Backend/UI/Input/Input";

export type RecordString = Record<string, string>;

export type RecordRecord = Record<string, string | RecordString>;

export type RecursiveDeepness = {
    paramItem: Record<string, string | RecordString | RecordRecord>;
    paramValue: string | RecordString | RecordRecord | undefined;
    pends: { regex: string; action: Function }[];
};

export function onChange<T>(
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>
) {
    return (e: React.ChangeEvent<HTMLInputElement>, ...deepness: string[]) => {
        const valueCopy = { ...value };

        if (deepness.length === 1) {
            (valueCopy as Record<string, string>)[deepness[0]] = e.target.value;
            if (e.target.files) readURL(e.target);
            return setValue(valueCopy as typeof value);
        }

        const subValues = [];
        let subValue: RecordString | RecordRecord = {
            ...value,
        } as typeof subValue;
        for (let i = 0; i < deepness.length - 1; i++) {
            const element = deepness[i];
            subValue = subValue[
                element as keyof typeof subValue
            ] as typeof subValue;
            subValues.push(subValue);
        }
        subValues[subValues.length - 1][deepness[deepness.length - 1]] =
            e.target.value;
        for (let i = 1; i < deepness.length - 1; i++) {
            const element = deepness[deepness.length - 1 - i];
            const index = subValues.length - 1 - i;
            (subValues[index] as Record<string, RecordString | RecordRecord>)[
                element
            ] = subValues[index + 1];
        }
        (valueCopy as Record<string, RecordString | RecordRecord>)[
            deepness[0]
        ] = subValues[0];

        setValue(valueCopy as typeof value);
    };
}

export const readURL = (input: HTMLInputElement) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const embed = document.getElementById(`embed-${input.name}`);
            if (!embed) return;

            embed.style.backgroundImage = `url('${e.target?.result}')`;
            embed.style.backgroundSize = "cover";

            const selected = embed.querySelector(".file-selected");
            if (!selected) return;

            selected.innerHTML = file.name;
        };

        reader.readAsDataURL(file); // convert to base64 string
    }
};

export function recursiveDeepness<T>(
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>
) {
    return (
        paramItem: RecursiveDeepness["paramItem"],
        paramName: string,
        paramValue: RecursiveDeepness["paramValue"],
        paramDeepness: string[],
        paramPrepends: RecursiveDeepness["pends"] = [],
        paramAppends: RecursiveDeepness["pends"] = []
    ) =>
        Object.keys(paramItem).map((item): JSX.Element => {
            const mainItem = paramItem[item];
            const mainName = `${paramName}[${item}]`;
            const mainValue = (paramValue as RecordString)[item];
            const mainDeepness = paramDeepness.concat(item);

            let prepend;
            const findPrepend = paramPrepends.find((el) =>
                new RegExp(
                    el.regex.replace(/\[/g, "\\[").replace(/\]/g, "\\]")
                ).test(mainName)
            );
            prepend = !findPrepend ? null : findPrepend.action(mainItem);

            let append;
            const findAppend = paramAppends.find((el) =>
                new RegExp(
                    el.regex.replace(/\[/g, "\\[").replace(/\]/g, "\\]")
                ).test(mainName)
            );
            append = !findAppend ? null : findAppend.action(mainItem);

            return typeof mainItem === "string" ? (
                <>
                    {prepend}
                    <FormInput
                        type="text"
                        className="col-md-6 col-lg-4"
                        name={mainName}
                        placeholder={mainItem}
                        addon={
                            <span className="text-small text-700">
                                {mainItem}
                            </span>
                        }
                        onChange={(e) =>
                            onChange(value, setValue)(e, ...mainDeepness)
                        }
                        value={mainValue}
                    />
                    {append}
                </>
            ) : (
                <>
                    {recursiveDeepness(value, setValue)(
                        mainItem,
                        mainName,
                        mainValue,
                        mainDeepness,
                        paramPrepends,
                        paramAppends
                    )}
                </>
            );
        });
}
