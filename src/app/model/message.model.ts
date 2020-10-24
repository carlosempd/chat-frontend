export interface Message {
    idUser: string;
    name: string;
    message: string;
    idAddressee: string;
    nameAddressee: string;
    date: number;
    me?: boolean;
}
