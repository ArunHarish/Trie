import NodeInterface from "./Node.interface";

type NodeValue<V> = {
    [key : string] : V
};


class TrieNode implements NodeInterface {
    private dictionary : NodeValue<TrieNode>;
    private value : string;
    constructor(value? : string) {
        this.dictionary = {};
        this.value = value || "*";
    };

    public append(key : string) : void {
        this.dictionary[key] = new TrieNode(key);
    };

    public getValue() : string {
        return this.value;
    };

    public hasChild(key : string) : boolean {
        return key in this.dictionary;
    };

    public getChild(key : string) : TrieNode {
        return this.dictionary[key];
    };

    public getChildren() : Array<TrieNode> {
        return Object.values(this.dictionary);
    };

};

export default TrieNode;