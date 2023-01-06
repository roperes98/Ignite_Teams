import { useState } from "react";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { useNavigation } from "@react-navigation/native";
import { createGroup } from '@storage/group/createGroup'

import { Container, Content, Icon } from "./styles";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
      }

      await createGroup(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}