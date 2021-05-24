import TrieNode from ".";

export default interface TrieInterface {
    append(letter : string) : void;
    getValue() : string;
    hasChild(key : string) : boolean;
    getChild(key : string) : TrieNode;
    getChildren() : Array<TrieNode>;
};