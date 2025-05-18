import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

// Mock data structure for threaded comments
const mockComments = [
  { id: 1, sender: 'Citizen', text: 'Pothole on Main St.', date: '2025-05-15 09:00', replies: [
    { id: 2, sender: 'Admin', text: 'We are reviewing your complaint.', date: '2025-05-15 10:00' }
  ] },
  { id: 3, sender: 'Citizen', text: 'Thank you!', date: '2025-05-15 11:00', replies: [] },
];

export default function AdminThreadedComments({ comments = mockComments }) {
  const [reply, setReply] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  function handleReply(parentId) {
    setReplyTo(parentId);
  }
  function handleSendReply() {
    // TODO: Integrate with backend
    alert(`Reply sent: ${reply} (to comment #${replyTo})`);
    setReply('');
    setReplyTo(null);
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Comments & Threaded Replies</Typography>
      {comments.map((c) => (
        <Box key={c.id} mb={2} ml={0}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" color="text.secondary">{c.sender} • {c.date}</Typography>
            <Button size="small" onClick={() => handleReply(c.id)}>Reply</Button>
          </Stack>
          <Typography variant="body2" mb={1}>{c.text}</Typography>
          {c.replies.map((r) => (
            <Box key={r.id} ml={3} mb={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" color="text.secondary">{r.sender} • {r.date}</Typography>
              </Stack>
              <Typography variant="body2">{r.text}</Typography>
            </Box>
          ))}
          {replyTo === c.id && (
            <Box ml={3} mt={1}>
              <TextField
                label="Reply"
                size="small"
                fullWidth
                value={reply}
                onChange={e => setReply(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button variant="contained" size="small" onClick={handleSendReply} disabled={!reply}>Send</Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
