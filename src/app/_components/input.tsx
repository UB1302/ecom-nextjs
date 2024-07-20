"use client";

export const Input = (props: {
  value: string;
  type: string;
  onChangeHandler: (input: any) => void;
  label: string;
  placeholder: string;
  style?: string | "";
}) => {
  return (
    <>
      <label>{props.label}</label>
      <br />
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChangeHandler(e)}
        className={"h-[3rem] border-2 border-[#C1C1C1] w-full rounded-[6px] " + props.style}
      />
    </>
  );
};
