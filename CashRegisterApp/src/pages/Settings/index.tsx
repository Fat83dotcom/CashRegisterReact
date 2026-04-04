import { Container, Title, Text, Avatar, Button, Group, FileButton } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";

export function SettingsHome() {
  const { user } = useAuth();
  
  return (
    <Container>
      <Title order={2} mb="lg">Configurações de Perfil</Title>
      
      <Group mb="xl">
        <Avatar 
          src={null} 
          alt="User photo" 
          radius="xl" 
          size={100} 
        />
        <div>
          <Text fw={500} size="lg">
            {user ? `${user.userName.firstName} ${user.userName.lastName}` : "Usuário"}
          </Text>
          <Text size="sm" c="dimmed">
            Perfil: {user?.role || "Desconhecido"}
          </Text>
          <FileButton onChange={() => console.log('File selected')} accept="image/png,image/jpeg">
            {(props) => <Button {...props} variant="outline" size="xs" mt="sm">Alterar Foto (Em breve)</Button>}
          </FileButton>
        </div>
      </Group>

      <Text>As opções avançadas de edição de perfil serão disponibilizadas em breve.</Text>
    </Container>
  );
}
