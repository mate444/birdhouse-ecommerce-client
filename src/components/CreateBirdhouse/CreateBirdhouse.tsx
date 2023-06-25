import React, { FC, useState, useEffect } from "react";
import { useBirdhouseActions } from "../../actions/birdhouse.actions";
import { useForm, useFieldArray } from "react-hook-form";
import { IBirdhouseValidation, birdhouseValidations } from "./validations";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
  useToast,
  CircularProgress
} from "@chakra-ui/react";

const CreateBirdhouse: FC = () => {
  const [file, setFile] = useState<FileList | null>(null);
  const { register, control, handleSubmit, setValue, setError, formState: { errors, isSubmitting } } = useForm<IBirdhouseValidation>({
    defaultValues: {
      styles: [{ name: "" }],
    } 
  });
  const { fields, append, remove } = useFieldArray({
    name: "styles",
    control
  });
  const toast = useToast();
  const { create } = useBirdhouseActions(toast);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      setError("pictures", { message: "Picture image is required" });
      return;
    }
    for (let i = 0; i < e.target.files?.length; i += 1) {
      const validFiles = ["image/jpg", "image/png", "image/jpeg"];
      if (!validFiles.includes(e.target.files[i].type)) {
        setError("pictures", { message: "jpg, png, jpeg are the only valid image formats" });
        return;
      }
    }
    setFile(e.target.files);
  };

  useEffect(() => {
    if (file) {
      setValue("pictures", file);
    }
  }, [file]);
  return (
    <Box>
      <Box>
        <Heading>
          Create a Birdhouse
        </Heading>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(create)} encType="multipart/form-data">
          <FormControl isInvalid={Object.values(errors).some((e) => e !== undefined)}>
            <FormLabel>Insert name</FormLabel>
            <FormErrorMessage>
              { errors.name && errors.name.message }
            </FormErrorMessage>
            <Input isInvalid={!!errors.name} id="birdhouse_name" {...register("name", {
              validate: birdhouseValidations.name,
            })}/>
            <FormLabel>Insert price</FormLabel>
            <FormErrorMessage>
              { errors.price && errors.price.message }
            </FormErrorMessage>
            <Input type="number" isInvalid={!!errors.price} id="birdhouse_price" {...register("price", {
              validate: birdhouseValidations.price
            })}/>
            <FormLabel>Insert stock</FormLabel>
            <FormErrorMessage>
              { errors.stock  && errors.stock.message }
            </FormErrorMessage>
            <Input type="number" isInvalid={!!errors.stock} id="birdhouse_stock" {...register("stock", {
              validate: birdhouseValidations.stock
            })}/>
            <FormLabel>Insert size (By cm2)</FormLabel>
            <FormErrorMessage>
              { errors.size && errors.size.message }
            </FormErrorMessage>
            <Input type="number" isInvalid={!!errors.size} id="birdhouse_size" {...register("size", {
              validate: birdhouseValidations.size
            })}/>
            <FormLabel>Insert Styles (Max 4)</FormLabel>
            { fields.map((s, i) => (
              <Box key={s.id}>
                <FormErrorMessage>{ errors.styles && errors.styles[i]?.name?.message }</FormErrorMessage>
                <Input isInvalid={!!errors.styles} {...register(`styles.${i}.name` as const, {
                  validate: birdhouseValidations.styles
                })} />
                <Button isDisabled={fields.length <= 1} onClick={() => remove(i)}>X</Button>
              </Box>
            )) }
            <Button isDisabled={fields.length >= 4} onClick={() => append({ name: "" })}>
              Add another style
            </Button>
            <FormLabel>Write a description</FormLabel>
            <FormErrorMessage>
              { errors.description && errors.description.message }
            </FormErrorMessage>
            <Textarea isInvalid={!!errors.description} id="birdhouse_description" {...register("description", {
              validate: birdhouseValidations.description
            })}/>
            <FormLabel> Add pictures </FormLabel>
            <FormErrorMessage>
              {errors.pictures && errors.pictures.message}
            </FormErrorMessage>
            <Input type="file" multiple onChange={(e) => handleFileChange(e)}/>
            <Button disabled={isSubmitting} type="submit">{ isSubmitting ? <CircularProgress isIndeterminate/> : "Create" }</Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default CreateBirdhouse;
