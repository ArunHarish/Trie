import Trie from "../src/Trie/";
import TrieInterface from "../src/Trie/Trie.interface";

let trie : TrieInterface<string>;
let names : Array<string>;

beforeAll(() => {
    names = ["James", "Jayden", "Jessica", "Smith"];
});

beforeEach(() => {
    trie = new Trie();
});

describe("Trie append query", function() {
    test("should return empty result for empty append", function() {
        trie.append("");
        let result : Array<string> = trie.traverse();
        expect(result).toEqual([]);
    });

    test("should return the only element appended", 
        function() {
        trie.append(names[0]);
        let result : Array<string> = trie.traverse();
        expect(result).toEqual(
            names.slice(0, 1)
        );
    });

    test("should return all the elements appended", 
        function() {
        names.forEach(name => {
            trie.append(name);
        });

        let result : Array<string> = trie.traverse();

        expect(result).toEqual(
            expect.arrayContaining(names)
        );

    });

});
