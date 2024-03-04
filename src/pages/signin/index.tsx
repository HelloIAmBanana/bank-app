import * as React from "react";
import { useForm } from "react-hook-form";
import Ajv, { JSONSchemaType } from "ajv";
import Grid from "@mui/material/Grid";
import { Box, Button, useRadioGroup } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import loginImage from "../../imgs/loginPage.svg";
import { Console } from "console";
import WelcomePage from "../welcome";

function getAsyncData(key: string) {
  const myPromise: Promise<UserData[]> = new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : []);
    }, 1000);
  });
  return myPromise;
}

function setAsyncData(key: string, value: UserData[]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(value);
    }, 1000);
  });
}
function setCurrentUser(key: string, value: UserData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(value);
      }, 1000);
    });
  }
const ajv = new Ajv();

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  required: [
    "email",
    "password",
  ],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserData>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl: string = URL.createObjectURL(file);
      console.log("Uploaded image URL:", imageUrl);
      setValue("avatarUrl", imageUrl);
    }
  };

  const onSubmit = async (data: UserData) => {
    const users = await getAsyncData("users");
    //console.log(users)
    for (let i = 0; i< users.length;i++){
        const currentUser = users[i];
        if(currentUser.email.includes(`${data.email}`)){
            if(currentUser.password.includes(`${data.password}`)){
                setCurrentUser("currentUser",currentUser);
                
                //alert(`Welcome ${currentUser.firstName}`)
            }
        }

    }    
    alert("Incorrect");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={5}
        md={6}
        my={15}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "65%",
          borderRadius: "20px",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={4}
        sm={6}
        md={5}
        component={Paper}
        elevation={8}
        square={false}
        borderRadius={5}
      >
        <Box
          sx={{
            my: 4,
            mx: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container spacing={1}>
            {/*  */}
            <Grid item ml={12} my={13}>
              <h1 className="firstTitle">Welcome back</h1>
            </Grid>
            <Grid item ml={12} sm={12} my={-10}>
              <h2 className="secondTitle">
                Welcome back! Please enter your details.
              </h2>
            </Grid>
            {/*  */}

            <Grid item ml={5} sm={2} mx={6} my={7} className="signinTitle">
              <h4>Email</h4>
            </Grid>
            <Grid item xs={8} sm={6} my={10}>
              <input
                className="signinLabel"
                type="email"
                {...register("email")}
                required
                placeholder="Enter your email"
              />
            </Grid>
            <Grid item ml={5} sm={2} mx={6} my={-6} className="signinTitle">
              <h4>Password</h4>
            </Grid>
            <Grid item xs={8} sm={6} my={-3}>
              <input
                className="signinLabel"
                type="password"
                {...register("password")}
                required
                placeholder="Password"
              />
            </Grid>
            <Grid container justifyContent="flex-start">
              <Grid item mx={7} my={7}>
                <Link to="#" className="existingUserButton">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Grid item ml={12} my={-5} mx={41}>
              <button type="submit" className="signinButton">
                Sign in
              </button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
