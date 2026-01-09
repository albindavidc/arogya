import { ChangeDetectionStrategy, Component, output, input, signal, effect, computed } from '@angular/core';
import { Pose } from './models/pose.model';

@Component({
  selector: 'app-pose-detail-modal',
  template: `
    <div 
      (click)="close.emit()" 
      class="fixed inset-0 bg-black/70 backdrop-blur-md z-40 animate-fade-in"
      aria-hidden="true">
    </div>

    <div 
      role="dialog" 
      aria-modal="true" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        (click)="$event.stopPropagation()"
        class="bg-black/50 backdrop-blur-xl border border-accent-20 rounded-2xl shadow-2xl shadow-[0_0_50px_rgba(180,160,232,0.15)] w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row animate-scale-in">
        
        <!-- Image Section -->
        <div 
          (click)="openFullscreen()"
          class="relative w-full md:w-1/2 h-[45vh] md:h-auto bg-black/20 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden flex-shrink-0 cursor-zoom-in">
          <img [src]="selectedImageUrl()" [alt]="pose().englishName" width="600" height="800" class="w-full h-full object-contain">
          
          <!-- Image Thumbnails - Left (Variations & Main) -->
          @if (leftThumbnails().length > 0) {
            <div class="absolute left-3 bottom-3 z-20 grid grid-cols-2 gap-2">
              @for(imageUrl of leftThumbnails(); track imageUrl) {
                <button (click)="$event.stopPropagation(); selectImage(imageUrl)" 
                        [class]="'w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 focus:outline-none bg-black/40 ' + (selectedImageUrl() === imageUrl ? 'border-primary-start scale-110 ring-2 ring-primary-start/30' : 'border-white/20 hover:border-white/50')">
                  <img [src]="imageUrl" [alt]="'View of ' + pose().englishName" width="48" height="48" class="w-full h-full object-cover">
                </button>
              }
            </div>
          }

          <!-- Image Thumbnails - Right (Steps & Anatomy) -->
          @if (rightThumbnails().length > 0) {
            <div class="absolute right-3 bottom-3 z-20 flex flex-col-reverse space-y-2 space-y-reverse">
              @for(imageUrl of rightThumbnails(); track imageUrl) {
                <button (click)="$event.stopPropagation(); selectImage(imageUrl)" 
                        [class]="'w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 focus:outline-none bg-black/40 ' + (selectedImageUrl() === imageUrl ? 'border-accent scale-110 ring-2 ring-accent/30' : 'border-white/20 hover:border-white/50')">
                  <img [src]="imageUrl" [alt]="'Steps for ' + pose().englishName" width="48" height="48" class="w-full h-full object-cover">
                </button>
              }
            </div>
          }

          <!-- Prev/Next Buttons -->
          <button 
            (click)="$event.stopPropagation(); previous.emit()"
            aria-label="Previous pose"
            class="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
    
          <button 
            (click)="$event.stopPropagation(); next.emit()"
            aria-label="Next pose"
            class="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <!-- Content Section -->
        <div class="w-full md:w-1/2 flex flex-col min-h-0">
          <!-- Sticky Header -->
          <div class="flex-shrink-0 p-6 pb-4 border-b border-accent-20 bg-black/50 backdrop-blur-md z-10 rounded-tr-2xl">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-2xl font-bold text-primary-start font-lora">{{ pose().sanskritName }}</h2>
                <p class="text-[#B8B8C4]">{{ pose().englishName }}@if(pose().pronunciation) { ({{ pose().pronunciation }}) }</p>
              </div>
              <button 
                (click)="close.emit()"
                class="text-[#6E6E7A] hover:text-white transition-colors"
                aria-label="Close modal">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
          
          <!-- Scrollable Details -->
          <div class="overflow-y-auto p-6">
            <div class="flex flex-col space-y-6 text-[#B8B8C4]">
              
              <div class="order-2 md:order-1">
                <h3 class="font-bold text-accent mb-2 border-b border-accent-20 pb-1">How to Do It</h3>
                <ul class="list-disc list-inside space-y-1 pl-2 text-sm">
                  @for(step of howToDoSteps(); track step) {
                    <li>{{ step }}</li>
                  }
                </ul>
              </div>

              @if (pose().frequency.length > 0) {
                <div class="order-1 md:order-2">
                  <h3 class="font-bold text-accent mb-2 border-b border-accent-20 pb-1">Practice Guide</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                    @for(level of pose().frequency; track level.level) {
                      <div class="bg-black/30 rounded-lg p-2 border border-white/10 text-center">
                        <h4 class="font-bold text-sm mb-2"
                            [class.text-green-400]="level.level === 'Beginner'"
                            [class.text-sky-400]="level.level === 'Intermediate'"
                            [class.text-fuchsia-400]="level.level === 'Advanced'">
                          {{ level.level }}
                        </h4>
                        <div class="text-xs space-y-1 text-[#B8B8C4]">
                          @if (level.duration) {
                            <p><strong class="font-medium text-white/70">Time:</strong> {{ level.duration }}</p>
                          }
                          @if (level.sets) {
                            <p><strong class="font-medium text-white/70">Sets:</strong> {{ level.sets }}</p>
                          }
                          @if (level.reps) {
                            <p><strong class="font-medium text-white/70">Reps:</strong> {{ level.reps }}</p>
                          }
                          <p><strong class="font-medium text-white/70">Freq:</strong> {{ level.frequency }}</p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (pose().why.length > 0) {
                <div class="order-3">
                  <h3 class="font-bold text-accent mb-2 border-b border-accent-20 pb-1">Why This Helps</h3>
                  <ul class="list-disc list-inside space-y-1 pl-2 text-sm">
                    @for(item of pose().why; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image Viewer -->
    @if (isImageFullscreen()) {
      <div 
        (click)="closeFullscreen()"
        (wheel)="onWheel($event)"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerUp($event)"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center animate-fade-in"
        [style.cursor]="zoomScale() > 1 ? 'grab' : 'zoom-out'">
        
        <img 
          (click)="$event.stopPropagation()"
          [src]="selectedImageUrl()" 
          [alt]="pose().englishName" 
          class="max-w-[95vw] max-h-[95vh] transition-transform duration-100 ease-out"
          [style.transform]="'translate(' + panPosition().x + 'px, ' + panPosition().y + 'px) scale(' + zoomScale() + ')'"
        />

        <!-- Close Button -->
        <button 
          (click)="closeFullscreen()" 
          class="absolute top-4 right-4 z-[70] p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close fullscreen image">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <!-- Reset Zoom Button -->
        <button 
          (click)="$event.stopPropagation(); resetZoom()" 
          class="absolute bottom-4 right-4 z-[70] p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Reset zoom">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h5V3H3v7h2V5zm14-2h-7v2h5v5h2V3zM5 19v-5H3v7h7v-2H5zm14 5h-7v-2h5v-5h2v7z"/></svg>
        </button>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoseDetailModalComponent {
  pose = input.required<Pose>();
  gender = input.required<'female' | 'male'>();
  close = output<void>();
  previous = output<void>();
  next = output<void>();

  selectedImageUrl = signal<string | undefined>(undefined);

  // --- Fullscreen image viewer state ---
  isImageFullscreen = signal(false);
  zoomScale = signal(1);
  panPosition = signal({ x: 0, y: 0 });
  isPanning = signal(false);
  private startPanPosition = { x: 0, y: 0 };
  private startImagePosition = { x: 0, y: 0 };

  readonly howToDoSteps = computed(() => {
    const p = this.pose();
    const gender = this.gender();
    if (gender === 'male' && p.howToDoMale) {
      return p.howToDoMale;
    }
    if (gender === 'female' && p.howToDoFemale) {
      return p.howToDoFemale;
    }
    return p.howToDo;
  });

  readonly leftThumbnails = computed(() => {
    const p = this.pose();
    const gender = this.gender();
    // Always identify the main image URL
    const mainUrl = (gender === 'male' && p.imageUrlMale) ? p.imageUrlMale : p.imageUrl;
    // Get array of variation URLs
    const extraUrls = ((gender === 'male' && p.imageUrlsMale) ? p.imageUrlsMale : p.imageUrls) ?? [];
    
    // Create a set to deduplicate, starting with the main URL if it exists
    const urlSet = new Set<string>();
    if (mainUrl) urlSet.add(mainUrl);
    extraUrls.forEach(url => urlSet.add(url));
    
    // Return array, ensuring the main pose is first
    return Array.from(urlSet);
  });

  readonly rightThumbnails = computed(() => {
    const p = this.pose();
    const gender = this.gender();
    const thumbnails: string[] = [];

    const stepsUrl = gender === 'male' ? p.stepsImageUrlMale : p.stepsImageUrlFemale;
    if (stepsUrl) {
      thumbnails.push(stepsUrl);
    }
    
    const handUrl = gender === 'male' ? p.handImageUrlMale : p.handImageUrlFemale;
    if (handUrl) {
      thumbnails.push(handUrl);
    }

    return thumbnails;
  });

  constructor() {
    effect(() => {
      const p = this.pose();
      const gender = this.gender();
      let imageUrl: string;
      if (gender === 'male' && p.imageUrlMale) {
        imageUrl = p.imageUrlMale;
      } else {
        imageUrl = p.imageUrl;
      }
      this.selectedImageUrl.set(imageUrl);
    });
  }

  selectImage(imageUrl: string): void {
    this.selectedImageUrl.set(imageUrl);
  }

  // --- Fullscreen image viewer methods ---
  openFullscreen(): void {
    this.isImageFullscreen.set(true);
    this.resetZoom();
  }

  closeFullscreen(): void {
    this.isImageFullscreen.set(false);
  }

  resetZoom(): void {
    this.zoomScale.set(1);
    this.panPosition.set({ x: 0, y: 0 });
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const zoomSpeed = 0.1;
    const oldScale = this.zoomScale();
    let newScale = oldScale - event.deltaY * zoomSpeed * 0.05;
    newScale = Math.max(1, Math.min(newScale, 5)); // Clamp scale
    
    if (newScale === oldScale) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const oldPos = this.panPosition();
    
    const newX = mouseX - (mouseX - oldPos.x) * (newScale / oldScale);
    const newY = mouseY - (mouseY - oldPos.y) * (newScale / oldScale);

    this.zoomScale.set(newScale);
    this.panPosition.set({ x: newX, y: newY });
  }

  onPointerDown(event: PointerEvent): void {
    if (this.zoomScale() <= 1) return;
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    this.isPanning.set(true);
    target.style.cursor = 'grabbing';
    this.startPanPosition = { x: event.clientX, y: event.clientY };
    this.startImagePosition = this.panPosition();
    target.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isPanning()) return;
    event.preventDefault();
    const dx = event.clientX - this.startPanPosition.x;
    const dy = event.clientY - this.startPanPosition.y;
    this.panPosition.set({ x: this.startImagePosition.x + dx, y: this.startImagePosition.y + dy });
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isPanning()) return;
    const target = event.currentTarget as HTMLElement;
    this.isPanning.set(false);
    target.style.cursor = 'grab';
    target.releasePointerCapture(event.pointerId);
  }
}