export default class TagMapper {
  public static toDTO(user: any ) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.profile_picture
        ? {
          id: user.profile_picture.id,
          name: user.profile_picture.name,
          description: user.profile_picture.description,
          url: user.profile_picture.url,
        }
        : null,
        entity: user.entity
    }
  }
}