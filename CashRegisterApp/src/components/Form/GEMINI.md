# Components Form - Documentation

## AsyncSelect & MultiSelectAsync
Componentes para seleção assíncrona de dados, padronizados para o ERP.

### Propriedades Base
- `name`: string (nome do campo no form).
- `fetcher`: `(query: string) => Promise<T[]>` (função de busca).
- `getLabel`: `(item: T) => string`.
- `getValue`: `(item: T) => string`.
- `onAdd`: `() => void` (opcional) - Trigger para Quick Create (abre modal).

### Implementação Quick Create (Modal)
Para criar entidades relacionadas sem perder dados do form:

1. **No componente pai (form):**
   ```tsx
   const modals = useModals();

   const handleOpenModal = () => {
     modals.openModal({
       title: "Novo Item",
       children: <EntidadeForm onSuccess={() => modals.closeAll()} />,
     });
   };
   ```

2. **No Select:**
   ```tsx
   <AsyncSelect<ITipo>
     name="id"
     onAdd={handleOpenModal}
     // ... outras props
   />
   ```

### Notas de Implementação
- Sempre envolva o trigger no formulário pai com `modals.openModal`.
- O formulário filho deve aceitar uma prop `onSuccess` e invocá-la após a criação bem-sucedida.
