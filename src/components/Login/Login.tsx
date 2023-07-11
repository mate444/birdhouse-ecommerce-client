import { FC, useState } from "react";
import BirdPic from "../../assets/bird_pic_1.jfif";
import { useUserActions } from "../../actions/user.actions";
import { useForm } from "react-hook-form";
import { 
  Box,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Link,
  Tooltip,
  useToast,
  CircularProgress,
  IconButton,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { ILogin, loginValidations } from "./validations";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ILogin>();
  const toast = useToast();
  const { login } = useUserActions(toast, navigate);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Flex h={"90vh"} overflow={"hidden"} justifyContent={"center"} alignItems={"center"}>
      <Flex maxW={"400px"}>
        <Flex flexDir={"column"} gap={5} alignItems={"center"}>
          <Heading
            mt={"10px"}
            p={"10px"}
            bgColor={"white"}
            borderRadius={20}
            textAlign={"center"}>
            Welcome back!
          </Heading>
          <Image borderRadius={5} src={BirdPic} alt="Bird Picture"/>
          <Flex flexDir={"column"}>
            <form onSubmit={handleSubmit(login)}>
              <FormControl
                p={"10px"}
                display={"flex"}
                flexDir={"column"}
                gap={5}
                isInvalid={!!errors.email || !!errors.password}>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
                <Input
                  bgColor={"white"}
                  borderRadius={20}
                  isInvalid={!!errors.email} id="email" {...register("email", {
                    validate: loginValidations.email
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
                      validate: loginValidations.password
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
                <Button
                  disabled={isSubmitting}
                  color={"white"}
                  bgColor={"#1B9706"}
                  type="submit">{ isSubmitting ? <CircularProgress isIndeterminate/> : "Log In" }</Button>
              </FormControl>
            </form>
          </Flex>
          <Box
            maxW={"250px"}
            textAlign={"center"}
            bgColor={"white"}
            p={"20px"}
            borderRadius={20}
            m={"5px"}>
            <Heading size={"xs"}>
            Don`t have an account?  
            Create one {" "}
              <Link textDecor={"underline"} color={"blue"} as={ReactLink} to="/register">here</Link>
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
