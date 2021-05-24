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

describe("Trie search results", function() {
    
    test("should return empty result for empty query", function() {
        let result = trie.search("");
        expect(result).toEqual([]);
    });

    test("should append a single letter and return the same when queried",
        function() {
        
        trie.append("A");

        let result = trie.search("A");

        expect(result).toEqual(["A"]);
    });

    test("should return all the words starting with the queried letter", 
        function() {
        
        let expectedResult : Array<string> = names.slice(0, 3);

        names.forEach((name : string) => {
            trie.append(name);
        });

        let result = trie.search("J");

        expect(result).toEqual(
            expect.arrayContaining(expectedResult)
        );
        
    });


    test("should return all the words starting partially with the queried" + 
         " letter", function() {
        names.forEach((name : string) => {
            trie.append(name);
        });

        let result = trie.search("Ja");

        expect(result).toEqual(
            expect.arrayContaining(["James", "Jayden"])
        );
    });

    test("should return empty result for the query not indexed", 
        function() {
        names.forEach((name : string) => {
            trie.append(name);
        });

        let result = trie.search("Adam");
        
        expect(result).toEqual([]);
    });

    test("should NOT return results for the query that are partially" +
        "matching", function() {
        names.forEach((name: string) => {
            trie.append(name);
        });

        let result = trie.search("Jan");

        expect(result).toEqual([]);
    });

});