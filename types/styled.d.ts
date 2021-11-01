// import original module declarations
import 'styled-components/native';

// and extend them!
declare module 'styled-components/native' {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
    accentColor: string;
    highlightColor: string;
  }
}

export default interface DefaultTheme {
  mainBgColor: string;
  textColor: string;
  accentColor: string;
  highlightColor: string;
}
