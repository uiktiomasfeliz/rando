export class ImgService {

 getImgName = status => {
    switch (status) {
      case 0:
        return "stop-red"
      case 1:
        return "warning-yelow"
      case 2:
        return "check-green"
  
      default:
        break;
    }
  }
}
