import { Input } from "reactstrap";

export default (props: {
    id?: string;
    value: string;
    name: string;
    readOnly?: boolean;
    required?: boolean;
    className?: string;
    defaultValue?: string | number | false | readonly string[];
    placeholder?: string;
}) => {
    return (
        <div className="h-100 position-relative" style={{ minHeight: 57 }}>
            <Input
                type="datetime"
                className="h-100"
                defaultValue={props.value}
            />
        </div>
    );
};
