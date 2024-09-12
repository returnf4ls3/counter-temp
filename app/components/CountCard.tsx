type Props = {
    id: string;
    name: string;
    value: number;
    number: string;
}
export const CountCard = ({ id, name, value, number }: Props) => {
    return ( 
        <span>
            {`${name}: ${value}`}
        </span>
    );
}