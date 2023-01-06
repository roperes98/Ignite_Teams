import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { getAllGroups } from "./getAllGroups";

export async function createGroup(newGroup: string) {
  try {
    const storedGroups = await getAllGroups()

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }

    const storage = JSON.stringify([...storedGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error;
  }
}