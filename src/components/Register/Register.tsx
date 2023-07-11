import { FC, useState } from "react";
import BirdPic from "../../assets/bird_pic_1.jfif";
import { 
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  IconButton,
  Link,
  Select,
  Tooltip,
  useToast,
  Flex,
  CircularProgress
} from "@chakra-ui/react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../actions/user.actions";
import { getCountries } from "../../utils/countries";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { IRegister, registerValidations } from "./validations";

const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IRegister>();
  const toast = useToast();
  const registerAction = useUserActions(toast, navigate).register;
  const countries = getCountries();
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Flex h={"90vh"} overflow={"hidden"} justifyContent={"center"} alignItems={"center"}>
      <Flex flexDir={"column"} maxW={"500px"}>
        <Flex flexDir={"column"} gap={5} alignItems={"center"}>
          <Heading
            mt={"10px"}
            p={"10px"}
            bgColor={"white"}
            borderRadius={20}
            textAlign={"center"}>
            Create your account
          </Heading>
          <Image src={BirdPic} borderRadius={5} alt="Bird Picture"/>
        </Flex>
        <Flex flexDir={"column"}>
          <form onSubmit={handleSubmit(registerAction)}>
            <FormControl
              p={"10px"}
              display={"flex"}
              flexDir={"column"}
              gap={5}
              isInvalid={!!errors.country || !!errors.email || !!errors.password}>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
              <Input
                bgColor={"white"}
                borderRadius={20}
                isInvalid={!!errors.email} id="email" {...register("email", {
                  validate: registerValidations.email
                })}
                placeholder="Insert your email"/>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
              <Flex>
                <Input
                  bgColor={"white"}
                  autoComplete={"password"}
                  borderRadius={"20px 0px 0px 20px"}
                  border={0}
                  isInvalid={!!errors.password} id="password" type={ showPassword ? "text" : "password" } {...register("password", {
                    validate: registerValidations.password
                  })}
                  placeholder="Insert your password"/>
                <IconButton
                  aria-label={"change-password-visibility"}
                  bgColor={"white"}
                  borderRadius={0}
                  onClick={handlePasswordVisibility}
                  icon={showPassword ? <FaEyeSlash/> : <FaEye />}/>
                <Flex
                  alignItems={"center"}
                  pr={"20px"}
                  bgColor={"white"}
                  borderRadius={"0px 20px 20px 0px"}>
                  <Tooltip label="Password must contain at least 1 number, 8 characters and 1 symbol">?</Tooltip>
                </Flex>
              </Flex>
              <FormErrorMessage>
                {errors.country && errors.country.message}
              </FormErrorMessage>
              <Select
                bgColor={"white"}
                borderRadius={20}
                isInvalid={!!errors.country} id="countries" {...register("country", {
                  validate: registerValidations.country
                })} placeholder="Select a country">{
                  countries.map((c) => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))
                }</Select>
              <Button
                color={"white"}
                bgColor={"#1B9706"}
                disabled={isSubmitting}
                type="submit">{ isSubmitting ? <CircularProgress isIndeterminate/> : "Create" }</Button>
            </FormControl>
          </form>
        </Flex>
        <Box
          alignSelf={"center"}
          maxW={"250px"}
          textAlign={"center"}
          bgColor={"white"}
          p={"20px"}
          borderRadius={20}
          m={"5px"}>
          <Heading size={"xs"}>
            Already have an account?
            Log in{" "}
            <Link textDecor={"underline"} color={"blue"} as={ReactLink} to="/login"> here</Link>
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
