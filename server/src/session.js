const removeExpiredSessions = async (userId) => {
    try {
      await db.collection('users').updateOne(
        { _id: userId },
        { $pull: { sessions: { expiresAt: { $lt: new Date() } } } }
      );
    } catch (error) {
      console.error('Error while removing expired sessions:', error);
    }
  };
  

const getUserBySessionId = async (sessionId) => {
    try {
      const user = await db.collection('users').findOne({
        sessions: { $elemMatch: { sessionId, expiresAt: { $gt: new Date() } } },
      });
  
      return user;
    } catch (error) {
      console.error('Error while getting user by session ID:', error);
      return null;
    }
  };
  
const validateSession = async (req, res, next) => {
    const sessionId = req.cookies.session_id || null;
  
    if (!sessionId) {
        req.isAuthenticated = false;
        next();
        return;
    }
  
    const user = await getUserBySessionId(sessionId);
  
    if (!user) {
        req.isAuthenticated = false;
        next();
        return;
    }
  
    // Supprime les sessions expirées
    await removeExpiredSessions(user._id);
  
    req.isAuthenticated = true;
    req.user = user;
    next();
};

module.exports = {
    validateSession,
    getUserBySessionId,
    removeExpiredSessions
};