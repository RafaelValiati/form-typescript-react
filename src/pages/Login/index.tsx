import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  const onSubmit = (data: IFormLogin) => {
    // Verifica se o formulário é válido antes de enviar
    if (isValid) {
      // Aqui você pode enviar os dados do formulário para o seu servidor
      // Por exemplo, usando fetch, axios ou outra biblioteca para requisições HTTP
      
      // Simulando uma requisição POST com os dados do formulário
      fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Login bem-sucedido!");
          } else {
            console.error("Erro ao fazer login:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Erro ao fazer login:", error.message);
        });
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <Input
            name="email"
            placeholder="Email" 
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          <Button title="Entrar" onClick={handleSubmit(onSubmit)} />
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
