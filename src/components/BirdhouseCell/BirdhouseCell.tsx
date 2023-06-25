import { FC, useState, useEffect, useRef } from "react";
import { useFormError } from "../../hooks/useFormError";
import {
  Td,
  Tr,
  Button,
  Input,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { FaPen, FaTimes, FaTrashRestore, FaSave, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { birdhouseValidations, BirdhouseCellError } from "./validations";
import { IUpdateBirdhouse, BirdhouseStatusEnum } from "../../interfaces/Birdhouse.interface";

interface IBirdhouseCellProps {
  birdhouseId: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  size: string;
  status: BirdhouseStatusEnum;
  styles: { style: string, id?: number }[];
  update: (birdhouse: IUpdateBirdhouse) => Promise<void>;
  remove: (body: { birdhouseId: string, status: BirdhouseStatusEnum }) => Promise<void>;
  pictures: { picture: string; id: number }[];
}

const BirdhouseCell: FC<IBirdhouseCellProps> = ({ birdhouseId, name, price, stock, description, size, styles, pictures, status, update, remove }) => {
  const [changes, setChanges] = useState<IUpdateBirdhouse>({
    birdhouseId,
    name,
    price,
    stock,
    description,
    size,
    status,
    styles: styles.map((s) => s.style),
    pictures: pictures.map((p) => p.picture)
  });
  const [errors, setErrors] = useState<BirdhouseCellError>({});
  const [editable, setEditable] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = {
      ...changes,
      [e.target.name]: e.target.value
    };
    setChanges(newValue);
    if (!isDirty) setIsDirty(true);
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = {
      ...changes,
      styles: [...changes.styles]
    };
    newValue.styles[index] = e.target.value;
    setChanges(newValue);
    if (!isDirty) setIsDirty(true);
  };
  const handleSubmit = () => {
    if (JSON.stringify(errors) === "{}") {
      setIsSubmitting(true);
      update(changes).then(() => {
        setIsSubmitting(false);
        setIsDirty(false);
        setEditable(false);
      }).catch(err => console.log(err));
    }
  };

  const handleDelete = () => {
    const newStatus = changes.status === BirdhouseStatusEnum.active ? BirdhouseStatusEnum.inactive : BirdhouseStatusEnum.active;
    remove({ birdhouseId, status: newStatus })
      .then(() => {
        setChanges({ ...changes, status: newStatus });
      });
  };

  useEffect(() => {
    setErrors(useFormError(changes, birdhouseValidations));
  }, [changes]);
  return (
    <Tr>
      <Td>
        <Text>{ errors.name && errors.name }</Text>
        <Editable isDisabled={editable === false} defaultValue={changes.name  }>
          <EditablePreview width="full"/>
          <Input as={EditableInput} name="name" value={changes.name} onChange={handleChange}/>
        </Editable>
      </Td>
      <Td>
        <Text>{ errors.price && errors.price }</Text>
        <Editable isDisabled={editable === false} defaultValue={`${price}`}>
          <EditablePreview width="full"/>
          <Input as={EditableInput} name="price" value={changes.price} onChange={handleChange} type="number"/>
        </Editable>
      </Td>
      <Td>
        <Text>{ errors.stock && errors.stock }</Text>
        <Editable isDisabled={editable === false} defaultValue={`${stock}`}>
          <EditablePreview width="full"/> 
          <Input as={EditableInput} name="stock" value={changes.stock} onChange={handleChange} type="number" />
        </Editable>
      </Td>
      <Td>
        <Text>{ errors.size && errors.size }</Text>
        <Editable isDisabled={editable === false} defaultValue={`${size}`}>
          <EditablePreview width="full"/>
          <Input as={EditableInput} name="size" value={changes.size} onChange={handleChange} type="number"/>
        </Editable>
      </Td>
      <Td>
        <Text>{ errors.description && errors.description }</Text>
        <Editable isDisabled={editable === false} defaultValue={description}>
          <EditablePreview width="full"/>
          <Input as={EditableInput} name="description" value={changes.description} onChange={handleChange}/>
        </Editable>
      </Td>
      <Td>
        {changes.styles.map((s, i) => (
          <Box key={i}>
            <Text>{errors.styles && errors.styles[i]}</Text>
            <Editable defaultValue={s}>
              <EditablePreview width="full"/>
              <Input as={EditableInput} name="styles" value={changes.styles[i]} onChange={(e) => handleStyleChange(e, i)}/>
            </Editable>
            { editable ?
              <Button
                isDisabled={changes.styles.length <= 1}
                onClick={() => setChanges({...changes, styles: changes.styles.filter((st, index) => i !== index)})}>
                <FaTrash />
              </Button> :
              null }
          </Box>
        ))}
        { editable ? <Button isDisabled={changes.styles.length >= 4} onClick={() => setChanges({ ...changes, styles: [...changes.styles, ""] })}>
          <FaRegPlusSquare />
        </Button> : null}
      </Td>
      <Td>
        <ButtonGroup>
          <Button onClick={() => setEditable(!editable)}>{ !editable ? <FaPen/> : <FaTimes />} </Button>
          { isDirty ? <Button onClick={handleSubmit} disabled={isSubmitting}> { !isSubmitting ? <FaSave /> : <CircularProgress isIndeterminate/> } </Button> : null }
          <Button onClick={handleDelete}>{ changes.status === BirdhouseStatusEnum.active ? <FaTrash /> : <FaTrashRestore /> }</Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

export default BirdhouseCell;
