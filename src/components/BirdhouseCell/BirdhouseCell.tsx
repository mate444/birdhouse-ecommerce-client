import { FC, useState, useEffect } from "react";
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
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { FaPen, FaTimes, FaTrashRestore, FaSave, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { birdhouseValidations, BirdhouseCellError } from "./validations";
import { IUpdateBirdhouse, BirdhouseStatusEnum, ISocialMedia } from "../../interfaces/Birdhouse.interface";

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
  socialMedia: ISocialMedia[];
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const BirdhouseCell: FC<IBirdhouseCellProps> = ({
  socialMedia,
  birdhouseId,
  name,
  price,
  stock,
  description,
  size,
  styles,
  pictures,
  status,
  update,
  remove,
  editable,
  setEditable }) => {
  const [changes, setChanges] = useState<IUpdateBirdhouse>({
    birdhouseId,
    name,
    price,
    stock,
    description,
    size,
    status,
    styles: styles.map((s) => s.style),
    pictures: pictures.map((p) => p.picture),
    socialMedia: socialMedia.map((s) => s.link)
  });
  const [errors, setErrors] = useState<BirdhouseCellError>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = {
      ...changes,
      [e.target.name]: e.target.value
    };
    setChanges(newValue);
    if (!isDirty) setIsDirty(true);
  };

  const handleMultipleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = {
      ...changes
    };
    if (e.target.name === "styles") {
      newValue.styles = [...changes.styles];
      newValue.styles[index] = e.target.value;
    }
    if (e.target.name === "socialMedia") {
      newValue.socialMedia = [...changes.socialMedia];
      newValue.socialMedia[index] = e.target.value;
    }
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
      <Td w={"150px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        <Text color={"red"}>{ errors.name && errors.name }</Text>
        <Editable isDisabled={editable === false} defaultValue={changes.name  }>
          <EditablePreview h={"full"} width="full"/>
          <Input as={EditableInput} name="name" value={changes.name} onChange={handleChange}/>
        </Editable>
      </Td>
      <Td w={"100px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        <Text color={"red"}>{ errors.price && errors.price }</Text>
        <Editable isDisabled={editable === false} defaultValue={`${price}`}>
          <EditablePreview h={"full"} width="full"/>
          <Input as={EditableInput} name="price" value={changes.price} onChange={handleChange} type="number"/>
        </Editable>
      </Td>
      <Td w={"100px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        <Text color={"red"}>{ errors.stock && errors.stock }</Text>
        <Editable isDisabled={editable === false} defaultValue={`${stock}`}>
          <EditablePreview h={"full"} width="full"/> 
          <Input as={EditableInput} name="stock" value={changes.stock} onChange={handleChange} type="number" />
        </Editable>
      </Td>
      <Td w={"100px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        <Text color={"red"}>{ errors.size && errors.size }</Text>
        <Editable isDisabled={editable === false} defaultValue={`${size}`}>
          <EditablePreview h={"full"} width="full"/>
          <Input as={EditableInput} name="size" value={changes.size} onChange={handleChange} type="number"/>
        </Editable>
      </Td>
      <Td w={"300px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        <Text color={"red"}>{ errors.description && errors.description }</Text>
        <Editable isDisabled={editable === false} defaultValue={description}>
          <EditablePreview minH={"40px"} width="full"/>
          <EditableInput as={Textarea} name="description" value={changes.description} onChange={handleChange}/>
        </Editable>
      </Td>
      <Td maxW={"300px"} w={"300px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        {changes.styles.map((s, i) => (
          <Flex gap={1} flexDir={"column"} key={i}>
            <Text color={"red"}>{errors.styles && errors.styles[i]}</Text>
            <Flex>
              <Editable
                isDisabled={editable === false}
                whiteSpace={"nowrap"}
                textOverflow={"clip"}
                overflow={"hidden"}
                defaultValue={s}
                w={"100%"}>
                <EditablePreview placeholder="Insert new style" h={"full"} w="full"/>
                <Input as={EditableInput} name="styles" value={changes.styles[i]} onChange={(e) => handleMultipleChange(e, i)}/>
              </Editable>
              { editable ?
                <Button
                  m={"auto"}
                  isDisabled={changes.styles.length <= 1}
                  onClick={() => setChanges({...changes, styles: changes.styles.filter((_st, index) => i !== index)})}>
                  <FaTrash />
                </Button> :
                null }
            </Flex>
          </Flex>
        ))}
        { editable ? <Button
          mt={"10px"}
          isDisabled={changes.styles.length >= 4}
          onClick={() => setChanges({ ...changes, styles: [...changes.styles, ""] })}>
          <FaRegPlusSquare />
        </Button> : null}
      </Td>
      <Td maxW={"300px"} w={"300px"} border={"1px solid rgba(0, 0, 0, .2)"}>
        { changes.socialMedia.map((s, i) => (
          <Flex gap={1} flexDir={"column"} key={i}>
            <Text color={"red"}>{errors.socialMedia && errors.socialMedia[i]}</Text>
            <Flex>
              <Editable
                w={"240px"}
                isDisabled={editable === false}
                whiteSpace={"nowrap"}
                textOverflow={"clip"}
                overflow={"hidden"}
                defaultValue={s}>
                <EditablePreview
                  placeholder="Insert new social media"
                  h={"full"}
                  w="full"/>
                <Input w={"100%"} as={EditableInput} name="socialMedia" value={changes.socialMedia[i]} onChange={(e) => handleMultipleChange(e, i)}/>
              </Editable>
              { editable ?
                <Button
                  m={"auto"}
                  isDisabled={changes.socialMedia.length <= 1}
                  onClick={() => setChanges({...changes, socialMedia: changes.socialMedia.filter((_st, index) => i !== index)})}>
                  <FaTrash />
                </Button> :
                null }
            </Flex>
          </Flex>
        ))}
        { editable ? <Button
          mt={"10px"}
          isDisabled={changes.socialMedia.length >= 5}
          onClick={() => setChanges({ ...changes, socialMedia: [...changes.socialMedia, ""] })}>
          <FaRegPlusSquare />
        </Button> : null}
      </Td>
      <Td w={"100px"} border={"1px solid rgba(0, 0, 0, .2)"}>
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
