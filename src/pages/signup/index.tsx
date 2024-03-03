import * as React from "react";
import { useForm } from "react-hook-form";
import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv()


type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  hobbies: string[];
  email: string;
  password: string;
  avatarUrl: string;
  gender: string;
  accountType: string;
  role: string;
};

const schema: JSONSchemaType<UserData> = {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    birthDate: { type: "string" },
    hobbies: { type: "array", items: { type: "string" } },
    email: { type: "string" },
    password: { type: "string" },
    avatarUrl: { type: "string" },
    gender: { type: "string", enum: ["male", "female"] },
    accountType: { type: "string", enum: ["business", "personal"] },
    role: { type: "string", enum: ["admin", "customer"] },
  },
  required: ["id","accountType","birthDate","email","firstName","gender","lastName","password"],
  additionalProperties: false,
}

const validate = ajv.compile(schema)

const SignUpPage: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<UserData>();
  
    const onSubmit = (data: UserData) => {
      const isValid = validate(data);
      if (isValid) {
        // Form data is valid, proceed with submission
        console.log("Form data is valid:", data);
        // Here you can save the form data to local storage or send it to a server
      } else {
        // Form data is invalid, handle errors
        console.error("Form data is invalid:", validate.errors);
      }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register("id")}required placeholder="id" />
        <input type="text" {...register("firstName")}required placeholder="First Name" />
        <input type="text" {...register("lastName")}required placeholder="Last Name" />
        <input type="text" {...register("email")}required placeholder="Email" />
        <input type="password" {...register("password")}required placeholder="Password" />
        <input type="date" {...register("birthDate")}required placeholder="Birth Date" />
        <select {...register("gender")}required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select {...register("accountType")} required>
          <option value="business">Business</option>
          <option value="personal">Personal</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default SignUpPage;