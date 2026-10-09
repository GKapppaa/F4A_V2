import { Text } from "../atoms/Text";
function FormCard({title, children, onSubmit, className=""}){
    return(
        <div className={}>
            <Text variant="h3">{title}</Text>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
}

export default FormCard;