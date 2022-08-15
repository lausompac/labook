export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        switch (plaintext) {
            case "selfmade":
                return "$2a$12$sXDASTjOnod8rIa5iP1ld.Q8s9ZXR8oDAvlmZr.i7Dz7thWGRRfqy"

            default:
                return "hash-mock";
        }
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        switch (plaintext) {
            case "selfmade":
                return hash === "$2a$12$sXDASTjOnod8rIa5iP1ld.Q8s9ZXR8oDAvlmZr.i7Dz7thWGRRfqy";

            default:
                return false;
        }
    }
}