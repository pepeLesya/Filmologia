
import type { SelectProps } from "antd";
import FilterZhanr from './FilterZhanr';



export const options: SelectProps["options"] = [
  { value: "документальный" },
  { value: "комедия" },
  { value: "музыка" },
  { value: "короткометражка" },
  { value: "драма" },
  { value: "триллер" },
  { value: "фантастика" },
  { value: "ужасы" },
];
export default function FilterGenres(props) {
    

    return (
       <FilterZhanr 
                selectedGenres={props.selectedGenres} 
                onChange={props.onChange} 
                options={options} 
            />
    )
}
