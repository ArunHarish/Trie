import Node from "./Node";

export type TraversalStack = {
    node : Node,
    content : string
};
export default interface Trie<T> {
    append(value : T) : void;
    traverse() : Array<T>;
    search(query : T) : Array<T>;
};