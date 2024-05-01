import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/Edit cabin
  let query = supabase.from("cabins");

  // a) CREATE
  if (!id) query.insert([{ ...newCabin, image: imagePath }]);
  // b)
  if (!id) query.update().eq("some_col", "someValue");

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabinss IF there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);

    throw new Error(
      "cabins image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}
