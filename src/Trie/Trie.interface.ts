
export default interface Trie<T> {
    append(value : T) : void;
    traverse() : Array<T>;
};