const form = document.getElementById('return-form');
const cameraWrap = document.getElementById('return-camera');
const cameraVideo = document.getElementById('return-camera-video');
const cameraCanvas = document.getElementById('return-camera-canvas');
const cameraStart = document.getElementById('return-camera-start');
const cameraCapture = document.getElementById('return-camera-capture');
const cameraRetake = document.getElementById('return-camera-retake');
const photoPreview = document.getElementById('return-photo-preview');
const photoStatus = document.getElementById('return-photo-status');
const submitBtn = document.getElementById('return-submit');
const formError = document.getElementById('return-form-error');
const successPanel = document.getElementById('return-success');
const returnHeader = document.getElementById('return-header');
const returnFootnote = document.getElementById('return-footnote');

let cameraStream = null;
let capturedPhoto = null;

function setPhotoStatus(message, isError = false) {
  if (!photoStatus) return;
  photoStatus.textContent = message;
  photoStatus.classList.toggle('is-error', isError);
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
  if (cameraVideo) cameraVideo.srcObject = null;
}

async function startCamera() {
  setPhotoStatus('');
  formError.hidden = true;

  if (!navigator.mediaDevices?.getUserMedia) {
    setPhotoStatus('Your browser cannot access a camera here. Try on your phone.', true);
    return;
  }

  try {
    stopCamera();
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 960 } },
      audio: false,
    });
    cameraVideo.srcObject = cameraStream;
    cameraWrap.hidden = false;
    cameraCapture.hidden = false;
    cameraRetake.hidden = true;
    photoPreview.hidden = true;
    capturedPhoto = null;
    setPhotoStatus('Point your camera at the duffle so the full bag is visible.');
  } catch {
    setPhotoStatus('Camera access was blocked. Allow camera permission and try again.', true);
  }
}

function capturePhoto() {
  if (!cameraStream || !cameraVideo.videoWidth) return;

  const width = cameraVideo.videoWidth;
  const height = cameraVideo.videoHeight;
  cameraCanvas.width = width;
  cameraCanvas.height = height;

  const ctx = cameraCanvas.getContext('2d');
  ctx.drawImage(cameraVideo, 0, 0, width, height);

  capturedPhoto = cameraCanvas.toDataURL('image/jpeg', 0.9);
  photoPreview.src = capturedPhoto;
  photoPreview.hidden = false;
  cameraWrap.hidden = true;
  cameraCapture.hidden = true;
  cameraRetake.hidden = false;
  stopCamera();
  setPhotoStatus('Live photo captured. You can retake if needed.');
}

function retakePhoto() {
  capturedPhoto = null;
  photoPreview.hidden = true;
  cameraRetake.hidden = true;
  startCamera();
}

if (cameraStart) cameraStart.addEventListener('click', startCamera);
if (cameraCapture) cameraCapture.addEventListener('click', capturePhoto);
if (cameraRetake) cameraRetake.addEventListener('click', retakePhoto);

window.addEventListener('pagehide', stopCamera);

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formError.hidden = true;

    if (!capturedPhoto) {
      formError.textContent = 'Take a live verification photo before submitting.';
      formError.hidden = false;
      return;
    }

    const label = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Sending…';

    const payload = {
      email: form.email.value.trim(),
      orderRef: form.orderRef.value.trim(),
      reason: form.reason.value,
      photo: capturedPhoto,
      photoSource: 'camera',
    };

    try {
      const response = await fetch('/api/submit-return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Could not submit your return request.');
      }

      form.hidden = true;
      if (returnHeader) returnHeader.hidden = true;
      if (returnFootnote) returnFootnote.hidden = true;
      successPanel.hidden = false;
      successPanel.querySelector('[data-return-reference]').textContent = data.reference;
      successPanel.querySelector('[data-return-message]').textContent = data.message;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      formError.textContent = error.message;
      formError.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = label;
    }
  });
}
