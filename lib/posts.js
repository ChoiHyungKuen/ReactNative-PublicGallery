import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  console.log('TEST,', user);
  console.log('TEST,', description);
  console.log('TEST,', description);

  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}
export const PAGE_SIZE = 3;

export async function getPosts({userId, mode, id} = {}) {
  // let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  // if (userId) {
  //   query = query.where('user.id', '==', userId);
  // }
  // console.log('TTTTT', userId);
  // console.log('TTTTT', id);
  // if (id) {
  //   const cursorDoc = await postsCollection.doc(id).get();
  //   query =
  //     mode === 'older'
  //       ? query.startAfter(cursorDoc)
  //       : query.endBefore(cursorDoc);
  // }

  // const snapshot = await query.get();
  const snapshot = await postsCollection.orderBy('createdAt', 'desc').get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(posts);

  return posts;
}

export async function getOlderPosts(id, userId) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

export async function getNewerPosts(id, userId) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}
