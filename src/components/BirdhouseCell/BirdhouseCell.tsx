import { FC } from "react";
import {
  Td,
  Tr,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";

interface IBirdhouseCellProps {
  birdhouseId: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  size: string;
  styles: { style: string, id: number }[];
  pictures: { picture: string; id: number }[]
}

const BirdhouseCell: FC<IBirdhouseCellProps> = ({ birdhouseId, name, price, stock, description, size, styles, pictures}) => {
  return (
    <Tr>
      <Td>
        <Editable defaultValue={name}>
          <EditablePreview width="full" />
        </Editable>
      </Td>
      <Td>
        <Editable  defaultValue={`${price}`}>
          <EditablePreview width="full" />
          <Input as={EditableInput} name="price" type="number"/>
        </Editable>
      </Td>
      <Td>
        <Editable defaultValue={`${stock}`}>
          <EditablePreview width="full" /> 
          <Input as={EditableInput} name="stock" type="number" />
        </Editable>
      </Td>
      <Td>
        <Editable defaultValue={`${size}`}>
          <EditablePreview width="full" />
          <Input as={EditableInput} name="size" type="number"/>
        </Editable>
      </Td>
      <Td>
        <Editable defaultValue={description}>
          <EditablePreview width="full" />
          <Input as={EditableInput} name="description" />
        </Editable>
      </Td>
      <Td>
        {styles.map((s, i) => (
          <Box key={s.id}>
            <Editable defaultValue={s.style}>
              <EditablePreview width="full" />
              <Input as={EditableInput} name="styles" />
            </Editable>
          </Box>
        ))}
      </Td>
      <Td>
        <ButtonGroup>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

export default BirdhouseCell;
