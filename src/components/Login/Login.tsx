import { FC, useState } from "react";
import BirdPic from "../../assets/bird_pic_1.jfif";
import { useUserActions } from "../../actions/user.actions";
import { useForm } from "react-hook-form";
import { 
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Tooltip,
  useToast,
  CircularProgress
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { ILogin, loginValidations } from "./validations";

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
    <Box>
      <Box>
        <Heading>
          Welcome back!
        </Heading>
        <Image src={BirdPic} alt="Bird Picture"/>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(login)}>
          <FormControl isInvalid={!!errors.email || !!errors.password}>
            <FormLabel>Enter your email</FormLabel>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <Input isInvalid={!!errors.email} id="email" {...register("email", {
              validate: loginValidations.email
            })} placeholder="Insert your email"/>
            <FormLabel>Type your password</FormLabel>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            <InputGroup>
              <Input isInvalid={!!errors.password} id="password" type={ showPassword ? "text" : "password" } {...register("password", {
                validate: loginValidations.password
              })} placeholder="Insert your password"/>
              <InputRightElement>
                <Button  onClick={handlePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
                <Box>
                  <Tooltip label="Password must contain at least 1 number, 8 characters and 1 symbol">?</Tooltip>
                </Box>
              </InputRightElement>
            </InputGroup>
            <Button disabled={isSubmitting} type="submit">{ isSubmitting ? <CircularProgress isIndeterminate/> : "Log In" }</Button>
          </FormControl>
        </form>
      </Box>
      <Box>
        <Text>
          Are you a new client?  
          Create your account {" "}
          <Link as={ReactLink} to="/register">here</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
