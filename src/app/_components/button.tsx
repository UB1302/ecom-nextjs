

// const Button: React.FC<ButtonProps> = ({ text, onClickHandler }) => {
//     return (
//         <button onClick={onClickHandler}>
//             {text}
//         </button>
//     );
// };

// export default Button;

// interface ButtonProps {
//     text: string;
//     onClickHandler: () => void;
// }


// export const Button = (props: {text: string, onClickHandler: (input: any) => void}) => {
    export const Button = (props: {text: string}) => {

    // const handleClick = () => {
    //     let input = "yo"
    //     props.onClickHandler(input)
    // }

    // return <button onClick={(e)=> props.onClickHandler(e)} className="bg-black w-full h-full rounded-[6px] text-white" type = "submit">
    //     {props.text}
    // </button>
    return <button className="bg-black w-full rounded-[6px] text-white h-[3rem] " type = "submit">
        {props.text}
    </button>
}