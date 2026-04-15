import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";

export interface IPasswordManagerInputProps {
  props?: Record<string, any>;
  getInputProps: Record<string, any>;
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      component="div" // <-- CORREÇÃO 1: Transforma o <p> numa <div>!
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Inclui números." },
  { re: /[a-z]/, label: "Inclui minúsculas." },
  { re: /[A-Z]/, label: "Inclui maiúsculas." },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Inclui caracteres especiais." },
];

function getStrength(password: string) {
  let multiplier = password.length > 12 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function PasswordManager({
  props,
  getInputProps,
}: IPasswordManagerInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  // Garante que o valor inicial não seja undefined para evitar warnings do React
  const [value, setValue] = useState(getInputProps.value || "");

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            {...props}
            {...getInputProps} // Espalha as propriedades do form (incluindo value e onChange original)
            onChange={(event) => {
              // 1. Atualiza o estado local para o Popover funcionar
              setValue(event.currentTarget.value);

              // 2. CORREÇÃO 2: Chama o onChange do form do Mantine para não perder a senha!
              if (getInputProps.onChange) {
                getInputProps.onChange(event);
              }
            }}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Inclui 12 ou mais caracteres."
          meets={value.length >= 12} // Alterado para >= para fazer sentido com o texto
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
