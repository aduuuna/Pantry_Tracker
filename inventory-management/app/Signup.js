// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Box,
//   Link,
//   Divider,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
// import { useRouter } from "next/router";
// import Link from "next/link";

// export default function SignUpPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const router = useRouter();

//   const validateForm = () => {
//     let isValid = true;
//     if (!email) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Email is invalid");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (password.length < 6) {
//       setPasswordError("Password must be at least 6 characters");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }
//     if (!confirmPassword) {
//       setConfirmPasswordError("Please confirm your password");
//       isValid = false;
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       isValid = false;
//     } else {
//       setConfirmPasswordError("");
//     }
//     return isValid;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       // Here you would typically send a request to your authentication API
//       console.log("Sign up submitted with:", { email, password });
//       // For demonstration, we'll just redirect to a login page
//       router.push("/login");
//     }
//   };

//   const handleGoogleSignUp = () => {
//     // Implement Google Sign-Up logic here
//     console.log("Google Sign-Up clicked");
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           noValidate
//           sx={{ mt: 1, width: "100%" }}
//         >
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             error={!!emailError}
//             helperText={emailError}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="new-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={!!passwordError}
//             helperText={passwordError}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type={showConfirmPassword ? "text" : "password"}
//             id="confirmPassword"
//             autoComplete="new-password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             error={!!confirmPasswordError}
//             helperText={confirmPasswordError}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle confirm password visibility"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     edge="end"
//                   >
//                     {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign Up
//           </Button>
//           <Link href="/login" passHref legacyBehavior>
//             <Typography component="a" variant="body2">
//               {"Already have an account? Sign In"}
//             </Typography>
//           </Link>
//         </Box>
//       </Box>
//     </Container>
//   );
// }
