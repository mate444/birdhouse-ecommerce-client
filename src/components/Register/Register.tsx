import React, { FC, useState } from "react";
import BirdPic from "../../assets/bird_pic_1.jfif";
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
  Select,
  Tooltip,
  Text,
  useToast,
  CircularProgress
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  IsEmail,
  MaxLength,
  IsString,
  IsStrongPassword
} from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useUserActions } from "../../actions/user.actions";
import { IsCountry } from "../../utils/validateCountry";
import { getCountries } from "../../utils/countries";
import { useNavigate, Link as ReactLink } from "react-router-dom";

// Add sending validation for controlling loaders
class UserRegister {
  @MaxLength(255)
  @IsEmail({}, { message: "Invalid email" })
    email: string;

  @IsString()
  @IsStrongPassword({ minNumbers: 1, minLength: 8, minSymbols: 1 }, {message: "Password is not strong enough"})
    password: string;

  @IsCountry({ message: "Country must not be empty" })
    country: string;
}

const resolver = classValidatorResolver(UserRegister);

const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserRegister>({ resolver });
  const toast = useToast();
  const registerAction = useUserActions(toast, navigate).register;
  const countries = getCountries();
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box>
      <Box>
        <Heading>
          Create your account
        </Heading>
        <Image src={BirdPic} alt="Bird Picture"/>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(registerAction)}>
          <FormControl isInvalid={!!errors.country || !!errors.email || !!errors.password}>
            <FormLabel>Enter your email</FormLabel>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <Input isInvalid={!!errors.email} id="email" {...register("email")} placeholder="example@domain.com"/>
            <FormLabel>Type your password</FormLabel>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            <InputGroup>
              <Input isInvalid={!!errors.password} id="password" type={ showPassword ? "text" : "password" } {...register("password")} placeholder="Type your password"/>
              <InputRightElement>
                <Button onClick={handlePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
                <Box>
                  <Tooltip label="Password must contain at least 1 number, 8 characters and 1 symbol">?</Tooltip>
                </Box>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.country && errors.country.message}
            </FormErrorMessage>
            <Select isInvalid={!!errors.country} id="countries" {...register("country")} placeholder="Select a country">{
              countries.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))
            }</Select>
            <Button disabled={isSubmitting} type="submit">{ isSubmitting ? <CircularProgress isIndeterminate/> : "Create" }</Button>
          </FormControl>
        </form>
      </Box>
      <Box>
        <Text>
          Already have an account?
          Log in{" "}
          <Link as={ReactLink} to="/login"> here</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
