export class UtilityService {
    public static objectXOR(a: any, b: any) {
        return (a || b) && !(a && b);
    }
}
