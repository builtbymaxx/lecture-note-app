// Integration stubs for file uploads and language model invocation. These
// implementations are intended for local development without external
// services. UploadFile creates an object URL for the provided file and
// InvokeLLM performs very naive extraction of key points and definitions.

// Upload a file and return a URL. In this stub implementation we use
// browser APIs to create an object URL that can be used for playback.
export async function UploadFile({ file }) {
  return { file_url: URL.createObjectURL(file) };
}

// A simplistic language model invocation. Parses the transcript into
// sentences and treats the first few sentences as key points. Definitions
// extraction is not implemented and returns an empty array.
export async function InvokeLLM({ prompt, response_json_schema }) {
  // Extract the transcript from the prompt by splitting on double newline
  // and grabbing the last section. This is a naive approach but works
  // adequately for demonstration purposes.
  const transcriptMatch = prompt.split('Transcript:\n');
  const transcript = transcriptMatch.length > 1 ? transcriptMatch.pop() : '';
  const sentences = transcript.split(/\n+/).filter(Boolean);
  const key_points = sentences.slice(0, 5).map((line) => ({ point: line.trim(), timestamp: '' }));
  return { key_points, definitions: [] };
}

export default { UploadFile, InvokeLLM };
