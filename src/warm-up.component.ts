import { ChangeDetectionStrategy, Component, output, signal, computed } from '@angular/core';
import { PoseDetailModalComponent } from './pose-detail-modal.component';
import { Pose } from './models/pose.model';

interface WarmUpExercise {
  name: string;
  description: string;
  imageUrl: string;
  steps: string[];
}

@Component({
  selector: 'app-warm-up',
  template: `
    <div class="animate-fade-in min-h-screen">
      <header class="bg-black/30 backdrop-blur-lg sticky top-0 z-30 border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E8A0BF] via-[#B4A0E8] to-[#A0E8C8]">Warm-Up Routine</h1>
              <p class="text-[#6E6E7A] text-sm">Prepare your body for practice</p>
            </div>
            <button (click)="back.emit()" class="text-sm font-medium text-[#B8B8C4] hover:text-white transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Back to Poses
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
          @for(exercise of warmUpExercises; track exercise.name) {
            <div (click)="openModal(exercise)" 
                 class="group relative transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
              <div class="holo-border-container h-full">
                <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl h-full shadow-lg shadow-black/30 flex flex-col">
                  <figure class="aspect-[4/3] overflow-hidden rounded-t-xl">
                    <img [src]="exercise.imageUrl" [alt]="exercise.name" width="400" height="300" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </figure>
                  <div class="p-5 flex flex-col flex-grow">
                    <div>
                      <h3 class="text-lg font-bold text-[#F4F4F8]">{{ exercise.name }}</h3>
                    </div>
                    <div class="mt-auto pt-4">
                      <span class="inline-block bg-gradient-to-r from-[#A0E8C8]/5 to-[#A0C8E8]/5 border border-[#A0E8C8]/20 text-[#A0E8C8] text-xs font-medium px-3 py-1 rounded-full">
                        {{ exercise.description }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </main>

       <footer class="bg-black/20 border-t border-white/5 text-[#6E6E7A] mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
            <p>&copy; 2025 Arogya. Practice with compassion.</p>
          </div>
        </footer>
    </div>

    @if (selectedExercise(); as exercise) {
      <app-pose-detail-modal 
        [pose]="exercise" 
        [gender]="'female'"
        (close)="closeModal()"
        (previous)="goToPreviousExercise()"
        (next)="goToNextExercise()">
      </app-pose-detail-modal>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PoseDetailModalComponent]
})
export class WarmUpComponent {
  back = output<void>();

  selectedExerciseIndex = signal<number | null>(null);

  readonly selectedExercise = computed(() => {
    const index = this.selectedExerciseIndex();
    if (index === null) {
      return null;
    }
    const exercise = this.warmUpExercises[index];
    // Adapt WarmUpExercise to the Pose interface for the modal
    return {
      sanskritName: exercise.name,
      englishName: 'Warm-Up Exercise',
      pronunciation: '',
      benefit: exercise.description,
      imageUrl: exercise.imageUrl,
      howToDo: exercise.steps,
      frequency: [],
      why: [],
    } as Pose;
  });

  openModal(exercise: WarmUpExercise): void {
    const index = this.warmUpExercises.findIndex(ex => ex.name === exercise.name);
    if (index !== -1) {
      this.selectedExerciseIndex.set(index);
    }
  }

  closeModal(): void {
    this.selectedExerciseIndex.set(null);
  }

  goToNextExercise(): void {
    const currentIndex = this.selectedExerciseIndex();
    if (currentIndex !== null) {
      const total = this.warmUpExercises.length;
      const nextIndex = (currentIndex + 1) % total;
      this.selectedExerciseIndex.set(nextIndex);
    }
  }

  goToPreviousExercise(): void {
    const currentIndex = this.selectedExerciseIndex();
    if (currentIndex !== null) {
      const total = this.warmUpExercises.length;
      const prevIndex = (currentIndex - 1 + total) % total;
      this.selectedExerciseIndex.set(prevIndex);
    }
  }

  readonly warmUpExercises: WarmUpExercise[] = [
    {
      name: 'Neck Rolls',
      description: 'Gently releases tension in the neck and upper shoulders, improving flexibility.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/03/neck-rolls-exercise-illustration.jpg',
      steps: [
        'Sit or stand tall, relaxing your shoulders.',
        'Gently drop your chin to your chest.',
        'Slowly roll your right ear toward your right shoulder.',
        'Continue the circle by dropping your head back, then rolling the left ear to the left shoulder.',
        'Repeat 3-5 times in each direction.'
      ]
    },
    {
      name: 'Shoulder Rolls',
      description: 'Warms up the shoulder joints and releases tightness in the upper back and neck.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/02/shoulder-rolls-exercise-illustration.jpg',
      steps: [
        'Sit or stand with arms relaxed by your sides.',
        'Inhale and lift your shoulders up toward your ears.',
        'Exhale and roll them back and down, squeezing your shoulder blades together.',
        'Repeat 5 times, then reverse the direction, rolling them forward.'
      ]
    },
    {
      name: 'Cat-Cow Pose (Marjaryasana/Bitilasana)',
      description: 'A dynamic movement that warms up the spine and improves flexibility and blood flow.',
      imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/11/Cat-Pose_Andrew-Clark_2400x1350-1-e1637604033202.jpg',
      steps: [
        'Start on your hands and knees in a tabletop position.',
        'Inhale as you drop your belly towards the mat, lifting your chin and chest (Cow Pose).',
        'Exhale as you round your spine toward the ceiling, tucking your chin to your chest (Cat Pose).',
        'Continue flowing between Cat and Cow for 5-10 breaths.'
      ]
    },
    {
      name: 'Seated Torso Twists',
      description: 'Warms up the spine and abdominal muscles, preparing them for deeper twists.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/01/seated-torso-twist-exercise-illustration.jpg',
      steps: [
        'Sit comfortably on the floor with your legs crossed.',
        'Place your right hand on your left knee and your left hand on the floor behind you.',
        'Inhale to lengthen your spine, exhale to gently twist to the left.',
        'Hold for a few breaths, then repeat on the other side.'
      ]
    },
    {
      name: 'Downward-Facing Dog (Adho Mukha Svanasana)',
      description: 'A full-body stretch that energizes and warms the arms, shoulders, back, and legs.',
      imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/11/Downward-Facing-Dog_Andrew-Clark_2400x1350-2.jpg',
      steps: [
        'From tabletop, curl your toes and lift your hips up and back.',
        'Form an inverted "V" shape with your body.',
        'Press your hands firmly into the mat and keep your head between your upper arms.',
        '"Pedal" your feet by bending one knee and then the other to stretch your hamstrings.'
      ]
    }
  ];
}