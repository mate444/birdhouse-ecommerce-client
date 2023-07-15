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
  CircularProgress,
  Flex,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  Image
} from "@chakra-ui/react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { convertToWebP, base64ToBlob } from "../../utils/convertToWebp";

const CreateBirdhouse: FC = () => {
  const [files, setFile] = useState<File[] | null>(null);
  const [pictures, setPictures] = useState<string[] | null>(null);
  const { register, control, handleSubmit, setValue, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<IBirdhouseValidation>({
    defaultValues: {
      styles: [{ name: "" }],
      socialMedia: [{ link: "" }]
    }
  });
  const styleFields = useFieldArray({
    name: "styles",
    control
  });
  const socialMediaFields = useFieldArray({
    name: "socialMedia",
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
    clearErrors("pictures");
    const webpFiles: File[] = [];
    convertToWebP(e.target.files)
      .then((webpImages) => {
        webpImages.forEach((webp) => {
          const base64Image = webp.split(",")[1];
          const webpFile = base64ToBlob(base64Image, "image/webp");
          webpFiles.push(webpFile);
        });
        setFile(webpFiles);
      });
  };
  useEffect(() => {
    if (files) {
      setValue("pictures", files);
      setPictures(files.map((f) => {
        return URL.createObjectURL(f);
      }));
    }
    return () => {
      pictures?.forEach((p) => {
        URL.revokeObjectURL(p);
      });
    };
  }, [files]);
  return (
    <Flex justifyContent={"center"}>
      <Flex gap={10} flexDir={"column"} p={"20px"}>
        <Center p={"10px"} bgColor={"white"} borderRadius={20}>
          <Heading textAlign={"center"}>
            Create a Birdhouse
          </Heading>
        </Center>
        <form onSubmit={handleSubmit(create)} encType="multipart/form-data">
          <FormControl
            display={"flex"}
            gap={5}
            flexDir={"column"}
            isInvalid={Object.values(errors).some((e) => e !== undefined)}>
            <FormLabel
              fontWeight={"black"}
              p={"20px"}
              borderRadius={5}
              textAlign={"center"}
              w={"fit-content"}
              alignSelf={"center"}
              bgColor={"#1B9706"}>Insert birdhouse values</FormLabel>
            <FormErrorMessage>
              { errors.name && errors.name.message }
            </FormErrorMessage>
            <Input
              bgColor={"white"}
              borderRadius={20}
              placeholder="Insert name"
              isInvalid={!!errors.name}
              id="birdhouse_name"
              {...register("name", {
                validate: birdhouseValidations.name,
              })}/>
            <FormErrorMessage>
              { errors.price && errors.price.message }
            </FormErrorMessage>
            <Input
              borderRadius={20}
              bgColor={"white"}
              placeholder={"Insert price"}
              type="number"
              isInvalid={!!errors.price}
              id="birdhouse_price"
              {...register("price", {
                validate: birdhouseValidations.price
              })}/>
            <FormErrorMessage>
              { errors.stock  && errors.stock.message }
            </FormErrorMessage>
            <Input
              borderRadius={20}
              bgColor={"white"}
              placeholder="Insert stock"
              type="number"
              isInvalid={!!errors.stock}
              id="birdhouse_stock"
              {...register("stock", {
                validate: birdhouseValidations.stock
              })}/>
            <FormErrorMessage>
              { errors.size && errors.size.message }
            </FormErrorMessage>
            <Input
              placeholder="Insert size (By cm2)"
              borderRadius={20}
              bgColor={"white"}
              type="number"
              isInvalid={!!errors.size}
              id="birdhouse_size"
              {...register("size", {
                validate: birdhouseValidations.size
              })}/>
            <FormLabel
              fontWeight={"black"}
              p={"20px"}
              borderRadius={5}
              w={"fit-content"}
              alignSelf={"center"}
              textAlign={"center"}
              bgColor={"#1B9706"}>
                Insert birdhouse Styles (Max 4)
            </FormLabel>
            { styleFields.fields.map((s, i) => (
              <Box key={s.id}>
                <FormErrorMessage>{ errors.styles && errors.styles[i]?.name?.message }</FormErrorMessage>
                <InputGroup
                  bgColor={"white"}
                  borderRadius={20}>
                  <Input
                    placeholder="Insert style"
                    borderRadius={20}
                    isInvalid={!!errors.styles}
                    {...register(`styles.${i}.name` as const, {
                      validate: birdhouseValidations.styles
                    })} />
                  <InputRightElement>
                    <IconButton
                      bgColor={"white"}
                      aria-label="Delete Style"
                      borderRadius={20}
                      icon={<FaTrashAlt />}
                      isDisabled={styleFields.fields.length <= 1}
                      onClick={() => styleFields.remove(i)} />
                  </InputRightElement>
                </InputGroup>
              </Box>
            )) }
            <IconButton
              aria-label="Add style"
              icon={<FaPlus/>}
              alignSelf={"center"}
              bgColor={"white"}
              borderRadius={20}
              w={"fit-content"}
              my={"5px"}
              isDisabled={styleFields.fields.length >= 4}
              onClick={() => styleFields.append({ name: "" })}/>
            <FormLabel
              fontWeight={"black"}
              p={"20px"}
              borderRadius={5}
              w={"fit-content"}
              alignSelf={"center"}
              textAlign={"center"}
              bgColor={"#1B9706"}>
                Insert birdhouse Social Media Links
            </FormLabel>
            { socialMediaFields.fields.map((s, i) => (
              <Flex key={s.id}>
                <FormErrorMessage>{ errors.socialMedia && errors.socialMedia[i]?.link?.message }</FormErrorMessage>
                <InputGroup
                  bgColor={"white"}
                  borderRadius={20}>
                  <Input
                    placeholder="Insert social media link"
                    borderRadius={20}
                    isInvalid={!!errors.socialMedia}
                    {...register(`socialMedia.${i}.link` as const, {
                      validate: birdhouseValidations.socialMedia
                    })} />
                  <InputRightElement>
                    <IconButton
                      bgColor={"white"}
                      aria-label="Delete Style"
                      borderRadius={20}
                      icon={<FaTrashAlt />}
                      isDisabled={socialMediaFields.fields.length <= 1}
                      onClick={() => socialMediaFields.remove(i)} />
                  </InputRightElement>
                </InputGroup>
              </Flex>
            )) }
            <IconButton
              aria-label="Add social media"
              icon={<FaPlus/>}
              alignSelf={"center"}
              bgColor={"white"}
              borderRadius={20}
              w={"fit-content"}
              my={"5px"}
              isDisabled={socialMediaFields.fields.length >= 4}
              onClick={() => socialMediaFields.append({ link: "" })}/>
            <Box
              bgColor={"white"}
              borderRadius={20}
              p={"10px"}>
              <FormLabel
                textAlign={"center"}
                fontWeight={"black"}>
                  Write a description
              </FormLabel>
              <FormErrorMessage>
                { errors.description && errors.description.message }
              </FormErrorMessage>
              <Textarea
                border={"none"}
                borderRadius={20}
                isInvalid={!!errors.description} id="birdhouse_description" {...register("description", {
                  validate: birdhouseValidations.description
                })}/>
            </Box>
            <FormLabel
              bgColor={"white"}
              width={"fit-content"}
              p={"10px"}
              borderRadius={20}
              color={errors.pictures ? "red" : "black"}
              htmlFor="pictures-input"> { !pictures ? <>Add pictures</> : <>Change pictures</> }</FormLabel>
            <Input
              display={"none"}
              id={"pictures-input"}
              type="file" 
              multiple
              onChange={(e) => handleFileChange(e)}/>
            <Flex gap={10} flexWrap={"wrap"} justifyContent={"center"}>
              { pictures && pictures.map((p) => (
                <Box bgColor={"white"} p={"10px"} borderRadius={20} key={p}>
                  <Image
                    borderRadius={20}
                    h={["20vh"]}
                    w={"100%"}
                    objectFit={"contain"}
                    src={p}
                    alt={"picpic"}/>
                </Box>
              )) }
            </Flex>
            <Button
              bgColor={"#1B9706"}
              color={"white"}
              borderRadius={20}
              w={"fit-content"}
              p={"30px"}
              disabled={isSubmitting}
              fontWeight={"semibold"}
              alignSelf={"center"}
              type="submit">
              { isSubmitting ? <CircularProgress isIndeterminate/> : "Create" }
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default CreateBirdhouse;
