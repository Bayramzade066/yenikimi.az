import {http} from './http';


export interface Translate{
    type : string;
    data : any[]
}

export const getTranslateList = async (): Promise<Translate> => {
    const { data } = await http.get<Translate>(`translate`);
    return data;
};