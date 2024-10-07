Encryption:

Encryption is used to provide confidentiality. `Confidentiality`: Means that only intended recipient can access the Data.

Basic Encryption:

We do have basic encryption methods and algorithms for encrypting data. For instance:

```
Hello -> oHell
Hello -> olleH
Hello -> ...
```

In this method, we are doing basic work for encrypt data, and some how shuffle the characters of word to make an encrypted data. But the issues are creating:

Imagine that you are a service and you want to send a message in secure way to different customers.

```
        | Hello --- Encription process ---> oHell (Customer 1)
Service | Hello --- Encription process ---> oHell (Customer 2)
        | Hello --- Encription process ---> oHell (Customer 3)
```

By doing this, because all encrypted datas are all same, customers can find out eachother messages. If we use shuffling: 

```
        | Hello --- Encription process ---> oHell (Customer 1)
Service | Hello --- Encription process ---> oHlel (Customer 2)
        | Hello --- Encription process ---> Holel (Customer 3)
```

But the encrypted data is still look like a original one.

Here, the engineers and mathematic scientists become with 2 different way for encryption.

The hole point of this was to:
- Experts create the algorithm 
- Secret key randomly will generated by us

They figure out that for encrypt data, we need a key for securely encrypt data to a hashed one. But there is 2 way for doing this:

1. Symmetric Encryption
2. Asymmetric Encryption

Difference:

| Algorithm | Way to encrypt/decrypt |
| --- | --- |
| Symmetric | Encrypt and Decrypt using the same keys |
| Asymmetric | Encrypt and Decrypt using different keys |

## Symmetric Encryption:

In symmetric encryption, the both encrypt and Decrypt keys are same.

In the Example above, we are trying to encrypt the word as `hello` by shifting each characters 5 time.

Encrypt Example:

```
hello -> khoor
```

For Decryption, we will shift each characters 5 time like encryption, but in reverse order. 

```
khoor -> hello
```

## Asymmetric Encryption:

In Asymmetric encryption, the both encrypt and Decrypt keys are **different**.

> [!IMPORTANT]
> Two different keys are mathematically related
> In Asymmetric encription, we do have 2 type of keys:
> 1. Public key: that is availabe for anyone
> 2. Private key: that will be kept by ourself in secure for validating the public key
> Anyone can use public key to encrypt data, but the encrypted data need your private key to decrypt

In the Example above, we are trying to encrypt the word as `hello` by shifting each characters 5 time.

Encrypt Example:

```
hello -> khoor
```

For Decryption, we will shift each characters 21 time like encryption, in forward!

```
khoor -> hello
```

> [!NOTE]
> The both examples was to show you how the differences defines in each of **Asymmetric** and **Symmetric** Encription.

| Topic | Asymmetric | Symmetric | Better Choice |
| --- | --- | --- | --- |
| Speed | Slower - Require much large key sizes | Faster - Lower CPU Cost | Symmetric |
| Cipher Size | Cipher text expansion (Has largers size than original one) | Chiper text is same size as the original plain text | Symmetric |
| Security | The secret key will be kept secure (More Secure) | The secret key must be shared (for encryption) - (Less Secure) | Asymmetric |

| Algorithm | Usage |
| --- | --- |
| Asymmetric | Restricted to limited data |
| Symmetric | Ideal for bulk data |

### Asymmetric Algorithms:

- DSA
- RSA 
- Diffie-Hellman
- ECDSA
- ECDH

### Symmetric Algorithms:

- DES (56 bit key) (Low Security nowadays)
- RC4 (128 bit key) (Low Security nowadays)
- 3DES (168 bit key)
- AES (128, 192 or 256 bit key)
- ChaCha20 (128 or 256 bit key)

