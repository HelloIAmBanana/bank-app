import * as React from "react";
import { useForm } from "react-hook-form";
import Ajv, { JSONSchemaType } from "ajv";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import signupImage from "../../imgs/signupPage.svg";
import Avatar from "@mui/material/Avatar";
import { resolve } from "path";

function getAsyncData(key: string) {
  const myPromise: Promise<string> = new Promise((resolve) => {
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

const ajv = new Ajv();

const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

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
    "id",
    "accountType",
    "birthDate",
    "email",
    "firstName",
    "gender",
    "lastName",
    "password",
    "avatarUrl",
  ],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

const SignUpPage: React.FC = () => {
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
    data.id = generateUniqueId();
    const isValid = validate(data);
    if (isValid) {
      const users = await getAsyncData("users");
      // async await Promise fullfill, rejected, pending
      const updatedUsers = Array.isArray(users) ? [...users, data] : [data];
      setAsyncData("users", updatedUsers);
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 10px 0px #5a5354da", borderRadius: "15px" }}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={true}
          sm={5}
          md={6}
          sx={{
            backgroundImage: `url(${signupImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "75%",
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

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              {/*  */}
              <Grid item ml={12}>
                <h1 className="firstTitle">CREATE ACCOUNT</h1>
              </Grid>
              <Grid item ml={12} sm={12} my={-5}>
                <h2 className="secondTitle">
                  Welcome! Please fill out the details below
                </h2>
              </Grid>
              {/*  */}
              <Grid item mx={45} my={6} style={{ textAlign: "center" }}>
                <Button
                  style={{
                    fontSize: "2rem",
                    padding: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#F1F1F1",
                  }}
                  component="label"
                >
                  <AddAPhotoIcon sx={{ color: "#212121" }} />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageUpload}
                    required
                  />
                </Button>
              </Grid>
              <Grid item xl={12} my={-8} mx={35}>
                <h4 className="addAvatarText">Upload profile image</h4>
              </Grid>
              {/*  */}
              <Grid item xl={12} my={-5}>
                {" "}
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={3}>
                <h4> First Name</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={5}>
                <input
                  type="text"
                  {...register("firstName")}
                  required
                  placeholder="First Name"
                />
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={-6}>
                <h4>Last Name</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={-5}>
                <input
                  type="text"
                  {...register("lastName")}
                  required
                  placeholder="Last Name"
                />
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={1}>
                <h4>Email</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={3}>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  required
                  placeholder="Email"
                />
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={-5}>
                <h4>Password</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={-3}>
                <input
                  type="password"
                  {...register("password")}
                  required
                  placeholder="Password"
                />
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={1}>
                <h4>Date Of Birth</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={3}>
                <input
                  type="date"
                  {...register("birthDate")}
                  required
                  placeholder="Birth Date"
                />
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={-5}>
                <h4>Gender</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={-3}>
                <select {...register("gender")} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </Grid>
              <Grid item ml={5} sm={2} mx={6} my={1}>
                <h4>Account Type</h4>
              </Grid>
              <Grid item xs={8} sm={6} my={3}>
                <select {...register("accountType")} required>
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                </select>
              </Grid>
              <Grid item ml={12} my={-2} mx={42}>
                <button type="submit" className="submitButton">
                  Register
                </button>
              </Grid>
              <Grid container justifyContent="flex-start">
                <Grid item mx={7} my={1}>
                  <Link to="/signin" className="existingUserButton">
                    Already got a user?
                  </Link>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUpPage;
