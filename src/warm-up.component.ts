import { ChangeDetectionStrategy, Component, output, signal, computed, input } from '@angular/core';
import { PoseDetailModalComponent } from './pose-detail-modal.component';
import { Pose } from './models/pose.model';

interface WarmUpExercise {
  name: string;
  category: string;
  description: string;
  benefit: string; // New field for the card tag
  imageUrl: string; // Fallback
  imageUrlFemale?: string;
  imageUrlMale?: string;
  steps: string[];
}

interface InstructionCategory {
  title: string;
  subTitle: string;
  purpose: string;
  instructions: string[];
  duration: string;
  appliedToText: string;
  targetCategories: string[]; // Used to filter exercises
}

@Component({
  selector: 'app-warm-up',
  template: `
    <div class="animate-fade-in min-h-screen">
      <header class="bg-black/30 backdrop-blur-lg sticky top-0 z-30 border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gradient-primary">Warm-Up Routine</h1>
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
        <!-- Warm-up overview section -->
        <section class="mb-12 bg-black/30 border border-white/5 rounded-xl p-8">
            <h2 class="text-center text-3xl font-bold text-[#F4F4F8] mb-8">Full Warm-Up Library</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
                <!-- Upper Body List -->
                <div>
                   <h3 class="text-xl font-bold text-primary-start mb-6 border-b border-white/10 pb-2">Upper Body & Core</h3>
                   <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      @for(category of upperBodyCategories(); track category.name) {
                        <div>
                            <h4 class="font-bold text-[#A0E8C8] mb-2 text-xs uppercase tracking-wider opacity-80">{{ category.name }}</h4>
                            <ul class="space-y-1">
                                @for(exercise of category.exercises; track exercise.name) {
                                    <li class="text-[#B8B8C4] hover:text-white transition-colors cursor-pointer" (click)="scrollTo(category.name)">{{ exercise.name }}</li>
                                }
                            </ul>
                        </div>
                      }
                   </div>
                </div>
                <!-- Lower Body List -->
                <div>
                   <h3 class="text-xl font-bold text-primary-end mb-6 border-b border-white/10 pb-2">Lower Body</h3>
                   <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      @for(category of lowerBodyCategories(); track category.name) {
                        <div>
                            <h4 class="font-bold text-[#A0E8C8] mb-2 text-xs uppercase tracking-wider opacity-80">{{ category.name }}</h4>
                            <ul class="space-y-1">
                                @for(exercise of category.exercises; track exercise.name) {
                                    <li class="text-[#B8B8C4] hover:text-white transition-colors cursor-pointer" (click)="scrollTo(category.name)">{{ exercise.name }}</li>
                                }
                            </ul>
                        </div>
                      }
                   </div>
                </div>
            </div>
        </section>

        <!-- General Movement Instructions Section -->
        <section class="mb-20">
          <div class="flex items-center gap-4 mb-8">
             <h2 class="text-2xl font-bold text-[#F4F4F8]">General Movement Guidelines</h2>
             <div class="h-px flex-1 bg-white/10"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            @for(instruction of generalInstructions; track instruction.title) {
              <div class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300 group relative">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-bold text-[#F4F4F8] text-lg">{{ instruction.title }}</h3>
                    <p class="text-xs font-medium text-accent uppercase tracking-wider">{{ instruction.subTitle }}</p>
                  </div>
                   <button (click)="openInstructionModal(instruction)" 
                           class="w-8 h-8 rounded-full bg-white/10 hover:bg-accent/20 text-[#B8B8C4] hover:text-accent border border-white/5 hover:border-accent/50 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                           aria-label="See applied exercises">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                     </svg>
                   </button>
                </div>
                
                <p class="text-xs text-[#B8B8C4] mb-4 italic leading-relaxed border-l-2 border-white/10 pl-3">
                  "{{ instruction.purpose }}"
                </p>
                
                <div class="mb-4">
                  <h4 class="text-[10px] uppercase text-[#6E6E7A] font-bold mb-2">Key Instructions</h4>
                  <ul class="space-y-1.5">
                    @for(step of instruction.instructions; track step) {
                      <li class="flex items-start gap-2 text-xs text-[#B8B8C4]">
                        <span class="mt-1 w-1 h-1 rounded-full bg-accent flex-shrink-0"></span>
                        <span>{{ step }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <div class="pt-3 border-t border-white/5 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-xs font-semibold text-[#F4F4F8]">{{ instruction.duration }}</span>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Upper Body Section -->
        <div class="mb-20">
          <div class="flex items-center gap-4 mb-10">
             <div class="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
             <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8A0BF] to-[#B4A0E8]">Upper Body & Core</h2>
             <div class="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
          
          @for(category of upperBodyCategories(); track category.name) {
            <section [id]="category.name" class="mb-16 scroll-mt-24">
              <div class="mb-6 flex items-baseline gap-3">
                <h3 class="text-xl font-bold text-[#F4F4F8]">{{ category.name }}</h3>
                <span class="h-px flex-1 bg-white/5"></span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                @for(exercise of category.exercises; track exercise.name) {
                  <div (click)="openModal(exercise)" 
                       class="group relative transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
                    <div class="holo-border-container h-full">
                      <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl h-full shadow-lg shadow-black/30 flex flex-col">
                        <figure class="aspect-[4/3] overflow-hidden rounded-t-xl">
                          <img [src]="gender() === 'male' && exercise.imageUrlMale ? exercise.imageUrlMale : (exercise.imageUrlFemale || exercise.imageUrl)" [alt]="exercise.name" width="400" height="300" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </figure>
                        <div class="p-5 flex flex-col flex-grow">
                          <div class="mb-3">
                            <h4 class="text-lg font-bold text-[#F4F4F8] leading-tight">{{ exercise.name }}</h4>
                          </div>
                          <div class="mt-auto">
                            <span class="inline-flex items-center gap-1.5 bg-[#A0E8C8]/10 border border-[#A0E8C8]/20 text-[#A0E8C8] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                              </svg>
                              {{ exercise.benefit }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </section>
          }
        </div>

        <!-- Lower Body Section -->
        <div class="mb-12">
          <div class="flex items-center gap-4 mb-10">
             <div class="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
             <h2 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A0E8C8] to-[#A0C8E8]">Lower Body</h2>
             <div class="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>

          @for(category of lowerBodyCategories(); track category.name) {
            <section [id]="category.name" class="mb-16 scroll-mt-24">
              <div class="mb-6 flex items-baseline gap-3">
                <h3 class="text-xl font-bold text-[#F4F4F8]">{{ category.name }}</h3>
                <span class="h-px flex-1 bg-white/5"></span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                @for(exercise of category.exercises; track exercise.name) {
                  <div (click)="openModal(exercise)" 
                       class="group relative transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
                    <div class="holo-border-container h-full">
                      <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl h-full shadow-lg shadow-black/30 flex flex-col">
                        <figure class="aspect-[4/3] overflow-hidden rounded-t-xl">
                          <img [src]="gender() === 'male' && exercise.imageUrlMale ? exercise.imageUrlMale : (exercise.imageUrlFemale || exercise.imageUrl)" [alt]="exercise.name" width="400" height="300" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </figure>
                        <div class="p-5 flex flex-col flex-grow">
                          <div class="mb-3">
                            <h4 class="text-lg font-bold text-[#F4F4F8] leading-tight">{{ exercise.name }}</h4>
                          </div>
                          <div class="mt-auto">
                            <span class="inline-flex items-center gap-1.5 bg-[#A0C8E8]/10 border border-[#A0C8E8]/20 text-[#A0C8E8] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                              </svg>
                              {{ exercise.benefit }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </section>
          }
        </div>
      </main>

       <footer class="bg-black/20 border-t border-white/5 text-[#6E6E7A] mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
            <p>&copy; 2025 Arogya. Practice with compassion.</p>
          </div>
        </footer>
    </div>

    <!-- Instruction Details Modal -->
    @if (selectedInstruction(); as instruction) {
      <div (click)="closeInstructionModal()" class="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] animate-fade-in flex items-center justify-center p-4">
        <div (click)="$event.stopPropagation()" class="bg-black/80 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-scale-in overflow-hidden">
          
          <!-- Modal Header -->
          <div class="p-6 border-b border-white/10 bg-black/50 backdrop-blur-xl flex justify-between items-start sticky top-0 z-10">
            <div>
              <h3 class="text-2xl font-bold text-white mb-1">{{ instruction.title }}</h3>
              <p class="text-accent text-sm font-medium uppercase tracking-wider">{{ instruction.subTitle }}</p>
            </div>
             <button (click)="closeInstructionModal()" class="text-[#B8B8C4] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6 overflow-y-auto custom-scrollbar">
             <!-- Applied To Section -->
             <div class="mb-8">
               <h4 class="text-sm font-bold text-[#6E6E7A] uppercase mb-3">Applied Body Parts</h4>
               <p class="text-[#F4F4F8] text-base leading-relaxed">{{ instruction.appliedToText }}</p>
             </div>

             <!-- Matching Exercises List (Text Only) -->
             <div>
               <h4 class="text-sm font-bold text-[#6E6E7A] uppercase mb-4 flex items-center gap-2">
                 Recommended Warm-Ups
                 <span class="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">{{ relatedExercises().length }}</span>
               </h4>
               
               @if (groupedRelatedExercises().length > 0) {
                 <div class="space-y-4">
                   @for(group of groupedRelatedExercises(); track group.category) {
                      <div class="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                        <h5 class="text-accent font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                           <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                           {{ group.category }}
                        </h5>
                        <ul class="space-y-2 pl-4 border-l border-white/10">
                          @for(name of group.names; track name) {
                            <li class="text-[#F4F4F8] text-sm font-medium">{{ name }}</li>
                          }
                        </ul>
                      </div>
                   }
                 </div>
               } @else {
                 <p class="text-[#6E6E7A] italic text-sm">No specific exercises found matching this category directly.</p>
               }
             </div>
          </div>
        </div>
      </div>
    }

    <!-- Exercise Detail Modal -->
    @if (selectedExercise(); as exercise) {
      <app-pose-detail-modal 
        [pose]="exercise" 
        [gender]="gender()"
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
  gender = input.required<'female' | 'male'>();

  activeExercise = signal<WarmUpExercise | null>(null);
  selectedInstruction = signal<InstructionCategory | null>(null);

  readonly exerciseCategories = computed(() => {
    const categories = new Map<string, WarmUpExercise[]>();
    for (const exercise of this.warmUpExercises) {
      if (!categories.has(exercise.category)) {
        categories.set(exercise.category, []);
      }
      categories.get(exercise.category)!.push(exercise);
    }
    return Array.from(categories.entries()).map(([name, exercises]) => ({ name, exercises }));
  });

  // Define classification keys
  readonly upperBodyKeys = new Set([
    'EYES', 'FACE & JAW', 'HEAD & NECK', 'SHOULDERS & UPPER BACK', 
    'ARMS, WRISTS & HANDS', 'SPINE & TORSO', 'CORE & ABDOMEN'
  ]);

  readonly lowerBodyKeys = new Set([
    'HIPS & PELVIS', 'LEGS & THIGHS', 'KNEES & LOWER LEGS', 'ANKLES & FEET'
  ]);

  readonly upperBodyCategories = computed(() => {
    return this.exerciseCategories().filter(c => this.upperBodyKeys.has(c.name));
  });

  readonly lowerBodyCategories = computed(() => {
    return this.exerciseCategories().filter(c => this.lowerBodyKeys.has(c.name));
  });

  readonly relatedExercises = computed(() => {
    const instruction = this.selectedInstruction();
    if (!instruction) return [];
    
    // Filter exercises whose category matches the target categories of the instruction
    return this.warmUpExercises.filter(ex => 
      instruction.targetCategories.includes(ex.category)
    );
  });

  readonly groupedRelatedExercises = computed(() => {
    const exercises = this.relatedExercises();
    const groups = new Map<string, string[]>();

    for (const ex of exercises) {
      if (!groups.has(ex.category)) {
        groups.set(ex.category, []);
      }
      groups.get(ex.category)!.push(ex.name);
    }
    return Array.from(groups.entries()).map(([category, names]) => ({ category, names }));
  });

  // Determine the current navigation list context
  readonly currentExerciseList = computed(() => {
     if (this.selectedInstruction()) {
         return this.relatedExercises();
     }
     return this.warmUpExercises;
  });

  readonly selectedExercise = computed(() => {
    const exercise = this.activeExercise();
    if (!exercise) {
      return null;
    }
    const currentGender = this.gender();
    const imageUrl = currentGender === 'male' && exercise.imageUrlMale 
      ? exercise.imageUrlMale 
      : (exercise.imageUrlFemale || exercise.imageUrl);
      
    // Adapt WarmUpExercise to the Pose interface for the modal
    return {
      sanskritName: exercise.name,
      englishName: 'Warm-Up Exercise',
      pronunciation: '',
      benefit: exercise.description,
      imageUrl: imageUrl,
      howToDo: exercise.steps,
      frequency: [],
      why: [],
    } as Pose;
  });

  openModal(exercise: WarmUpExercise): void {
    this.activeExercise.set(exercise);
  }

  closeModal(): void {
    this.activeExercise.set(null);
  }

  openInstructionModal(instruction: InstructionCategory): void {
    this.selectedInstruction.set(instruction);
  }

  closeInstructionModal(): void {
    this.selectedInstruction.set(null);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goToNextExercise(): void {
    const current = this.activeExercise();
    const list = this.currentExerciseList();
    if (current && list.length > 0) {
      const idx = list.indexOf(current);
      if (idx !== -1) {
        const nextIdx = (idx + 1) % list.length;
        this.activeExercise.set(list[nextIdx]);
      }
    }
  }

  goToPreviousExercise(): void {
    const current = this.activeExercise();
    const list = this.currentExerciseList();
    if (current && list.length > 0) {
      const idx = list.indexOf(current);
      if (idx !== -1) {
        const prevIdx = (idx - 1 + list.length) % list.length;
        this.activeExercise.set(list[prevIdx]);
      }
    }
  }

  readonly generalInstructions: InstructionCategory[] = [
    {
      title: 'Joint Rotations & Patterns',
      subTitle: 'Circles & Tracing',
      purpose: 'Lubricate joints, increase synovial fluid, and improve coordination.',
      instructions: [
        'Reps: 8-10 slow circles or tracings (figure-8s)',
        'Sets: 1-2 per joint',
        'Breath: Inhale for half circle, Exhale for half circle',
        'Freq: Daily, ideally upon waking',
        'Tip: Move slowly with control through full range'
      ],
      duration: '30-45s per joint',
      appliedToText: 'Neck, shoulders, wrists, hips, knees, ankles',
      targetCategories: ['HEAD & NECK', 'SHOULDERS & UPPER BACK', 'ARMS, WRISTS & HANDS', 'HIPS & PELVIS', 'KNEES & LOWER LEGS', 'ANKLES & FEET']
    },
    {
      title: 'Active Motion & Flows',
      subTitle: 'Lifts, Flexion & Reps',
      purpose: 'Increase blood flow, warm muscles, and establish range of motion.',
      instructions: [
        'Reps: 10-15 controlled repetitions',
        'Sets: 2-3 sets',
        'Breath: Inhale to lift/open (expansion), Exhale to lower/close (contraction)',
        'Freq: Pre-workout or warm-up',
        'Tip: Avoid momentum, focus on muscle engagement'
      ],
      duration: '45-60s per exercise',
      appliedToText: 'Leg swings, arm raises, cat-cow, squats, heel raises',
      targetCategories: ['LEGS & THIGHS', 'SHOULDERS & UPPER BACK', 'SPINE & TORSO', 'HIPS & PELVIS', 'CORE & ABDOMEN', 'KNEES & LOWER LEGS']
    },
    {
      title: 'Static & Isometric Holds',
      subTitle: 'Stretches & Stability',
      purpose: 'Lengthen tight muscles (stretching) or build stability (isometric).',
      instructions: [
        'Time: Hold for 15-30 seconds',
        'Sets: 2-3 holds per side',
        'Breath: Deep, steady 4-count inhale and 4-count exhale',
        'Freq: Post-workout or cooldown',
        'Tip: Engage core at 70% effort (stability) or relax into stretch'
      ],
      duration: '15-30s per hold',
      appliedToText: 'Hamstring stretch, plank hold, wall sits, neck release',
      targetCategories: ['LEGS & THIGHS', 'HIPS & PELVIS', 'SPINE & TORSO', 'SHOULDERS & UPPER BACK', 'CORE & ABDOMEN']
    },
    {
      title: 'Rhythmic Pulses & Shifts',
      subTitle: 'Micro-Movements',
      purpose: 'Improve balance, proprioception, and deepen mobility at end-range.',
      instructions: [
        'Reps: 20-30 small pulses',
        'Sets: 1-2 sets',
        'Breath: Continuous, rhythmic natural breathing',
        'Freq: Before deep static stretching',
        'Tip: Keep range small (1-2 inches) and continuous'
      ],
      duration: '30-45s',
      appliedToText: 'Lunge pulses, weight shifts, heel-toe rocks',
      targetCategories: ['ANKLES & FEET', 'HIPS & PELVIS', 'KNEES & LOWER LEGS', 'CORE & ABDOMEN']
    },
    {
      title: 'Extremity Activation',
      subTitle: 'Hands & Feet',
      purpose: 'Wake up small intrinsic muscles to improve dexterity and grounding.',
      instructions: [
        'Reps: 10-15 cycles (Spread & Squeeze)',
        'Sets: 2 sets',
        'Breath: Inhale to spread wide, Exhale to squeeze tight',
        'Freq: Anytime stiffness occurs',
        'Tip: Pause briefly at the extreme of each movement'
      ],
      duration: '30s',
      appliedToText: 'Finger spreads, toe splays, fist clenches',
      targetCategories: ['ANKLES & FEET', 'ARMS, WRISTS & HANDS']
    }
  ];

  readonly warmUpExercises: WarmUpExercise[] = [
    // EYES
    {
      name: 'Eye Warm-Up Series',
      category: 'EYES',
      benefit: 'Improves Focus & Vision',
      description: 'A comprehensive series of movements to strengthen eye muscles, relieve strain from screen time, and improve focus, peripheral awareness, and overall ocular coordination.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-eye.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-eye.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-eye.png?raw=true',
      steps: [
        'ROTATIONS: Slowly trace a large circle with your eyes clockwise (3-5 times), then counterclockwise (3-5 times).',
        'HORIZONTAL & VERTICAL: Look side-to-side (5-10 times), then look up and down (5-10 times).',
        'DIAGONAL: Move your eyes from top-right to bottom-left (5 times), then top-left to bottom-right (5 times).',
        'FOCUS SHIFT: Focus on your thumb (10 inches away) for 5 seconds, then shift to a distant object (20+ feet away) for 5 seconds. Repeat for 1-2 minutes.',
        'PALMING (REST): Rub palms to create warmth, then gently cup them over closed eyes for 30-60 seconds to relax.'
      ]
    },
    // FACE & JAW
    {
      name: 'Face & Jaw Relaxation Series',
      category: 'FACE & JAW',
      benefit: 'Releases Tension',
      description: 'A complete routine to release tension in the jaw, face, and sinuses, improving circulation and relaxation.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-face.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-face.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-face.png?raw=true',
      steps: [
        'LION\'S BREATH (Simhasana): Inhale deeply, exhale forcefully "HA" with tongue out and gaze up.',
        'JAW CIRCLES: Slowly rotate your lower jaw 5 times clockwise, then 5 times counter-clockwise.',
        'FOREHEAD & TEMPLE MASSAGE: Use fingertips to gently massage in circular motions to release tension.',
        'SINUS PRESSURE RELEASE: Gently press points near the bridge of the nose and under cheekbones.',
        'JAW RESISTANCE STRETCH: Place fist under chin, slowly open mouth against the gentle resistance.',
        'JAWLINE MASSAGE: Use knuckles to sweep from the chin up towards the ears.'
      ]
    },
    // HEAD & NECK
    {
      name: 'Head & Neck Series',
      category: 'HEAD & NECK',
      benefit: 'Corrects Posture',
      description: 'A complete sequence to release tension, improve flexibility, and correct posture in the neck and upper shoulders.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-head.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-head.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-head.png?raw=true',
      steps: [
        'NECK ROLLS (HALF-CIRCLES): Gently drop chin to chest. Slowly roll right ear to right shoulder, then back to center and over to the left. Repeat 3-5 times.',
        'SIDE STRETCHES: Tilt right ear to right shoulder, keeping the left shoulder down. Hold for 15-30 seconds, then switch sides.',
        'FLEXION & EXTENSION: Gently drop your chin to your chest, then slowly tilt your head back to look at the ceiling. Repeat 5 times.',
        'CHIN TUCKS: Keeping your gaze forward, gently draw your head straight back to create a double chin. Hold for 5 seconds and repeat 5-10 times.'
      ]
    },
    // SHOULDERS & UPPER BACK
    {
      name: 'Full Shoulder Mobility Series',
      category: 'SHOULDERS & UPPER BACK',
      benefit: 'Mobility & Stability',
      description: 'A comprehensive routine combining dynamic rotations, static stretches, and activation poses to fully prepare the shoulder girdle, improve mobility, and build stability for your practice.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-shoulder.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-shoulder.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-shoulder.png?raw=true',
      steps: [
        'SHOULDER SOCKET ROTATION: Begin with gentle Shoulder Rolls. Inhale shoulders up to your ears, then exhale as you roll them back and down. Repeat 5-8 times, then reverse the direction for 5-8 forward rolls.',
        'ARM CIRCLES: Extend arms out to your sides. Make 10 small forward circles, then 10 backward circles. Gradually increase the circle size for another set of 10 in each direction.',
        'ALTERNATE ARM RAISES: Stand tall. Inhale as you raise your right arm straight up overhead. Exhale as you lower it. Alternate with the left arm. Perform 8-10 raises per arm.',
        'EAGLE ARMS (GARUDASANA): Extend arms forward. Cross the right arm over the left, bend elbows, and wrap forearms to bring palms together. Gently lift elbows and press forearms away. Hold for 20-30 seconds, then switch sides.',
        'COW FACE ARMS (GOMUKHASANA): Reach your right arm up, bend the elbow, and place your hand on your upper back. Reach your left arm down and behind to clasp fingers. Use a strap if needed. Hold for 20-30 seconds, then switch.',
        'CROSS-BODY SHOULDER STRETCH: Gently pull your right arm across your chest with your left hand, feeling a stretch in the back of your shoulder. Keep the shoulder down. Hold for 20-30 seconds, then switch sides.',
        'OVERHEAD TRICEPS STRETCH: Reach your right arm overhead, bend the elbow, and place your hand on your upper back. Use your left hand to gently press on the right elbow. Hold for 20-30 seconds, then switch sides.',
        'WARRIOR I (VIRABHADRASANA I): Step into a lunge with your right foot forward, back foot angled. Bend your front knee and raise your arms overhead, palms facing. Hold for 5 breaths.',
        'WARRIOR II (VIRABHADRASANA II): From Warrior I, open your hips and arms out to the sides, parallel to the floor. Gaze over your front fingertips. Hold for 5 breaths, then repeat Warrior I & II on the other side.'
      ]
    },
    // ARMS, WRISTS & HANDS
    {
      name: 'Full Arm, Wrist & Hand Series',
      category: 'ARMS, WRISTS & HANDS',
      benefit: 'Joint Lubrication',
      description: 'A complete sequence to lubricate joints, increase flexibility, and activate the muscles from your fingertips to your elbows, preparing them for weight-bearing poses.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-wrist.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-wrist.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-wrist.png?raw=true',
      steps: [
        'WRIST CIRCLES: Extend arms forward. Make 10 slow, large circles with your wrists clockwise, then 10 counterclockwise.',
        'WRIST FLEXION & EXTENSION: Extend right arm, palm up. Gently bend wrist down with left hand for 15-20 secs. Then, point fingers up and gently pull them back for 15-20 secs. Repeat on the left arm.',
        'PRAYER & REVERSE PRAYER: Bring palms together at chest (Prayer). Gently lower hands towards waist. Hold 20-30 secs. Then, try to clasp hands behind your back, fingers pointing up (Reverse Prayer).',
        'FINGER SPREADS & FISTS: Extend arms. Spread fingers wide for 5 secs, then make a tight fist for 5 secs. Repeat 5-10 times.',
        'TABLETOP WRIST STRETCHES: On hands and knees, first place palms flat with fingers forward. Next, turn fingers to face your knees and gently rock back. Finally, place the back of your hands on the mat, fingers toward knees. Hold each position for 15-20 secs.'
      ]
    },
    // SPINE & TORSO
    {
      name: 'Spine Mobility Series 1',
      category: 'SPINE & TORSO',
      benefit: 'Awakens The Spine',
      description: 'A comprehensive flow to awaken the spine, improve posture, and release tension through flexion, extension, twisting, and side bending.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-spine1.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-spine1.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-spine1.png?raw=true',
      steps: [
        'CAT POSE (MARJARYASANA): On hands and knees, exhale and round your spine toward the ceiling, tucking chin to chest.',
        'COW POSE (BITILASANA): Inhale, drop belly toward mat, lift chin and chest, arching the back.',
        'SEATED TORSO TWIST: Sit cross-legged. Inhale lengthen spine, exhale twist gently to one side. Repeat other side.',
        'STANDING SIDE BEND: Stand tall, reach arms up. Lean to one side lengthening the side body. Switch.',
        'SPINAL WAVE: From Child’s Pose, round forward into a modified plank/updog, then wave back.',
        'PELVIC TILTS: Lie on back. Flatten lower back to mat (Posterior), then arch slightly (Anterior).',
        'SUPINE SPINAL TWIST: Lie back, knees to chest, drop legs to one side, look opposite.'
      ]
    },
    {
      name: 'Spine Mobility Series 2 (Thread the Needle)',
      category: 'SPINE & TORSO',
      benefit: 'Opens Shoulders',
      description: 'A gentle twist that opens the shoulders, upper back, and neck.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-spine2.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-spine2.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-spine2.png?raw=true',
      steps: [
        'Start in a tabletop position on hands and knees.',
        'Inhale, reach your right arm high to the sky, opening the chest.',
        'Exhale, slide your right arm under your left arm, bringing your right shoulder and cheek to the mat.',
        'Hold for 5-10 breaths. Press into left hand to rise and switch sides.'
      ]
    },
    // CORE & ABDOMEN
    {
      name: 'Core Series 1: Stability & Activation',
      category: 'CORE & ABDOMEN',
      benefit: 'Activates Deep Core',
      description: 'Essential movements to activate the deep core, glutes, and stabilize the pelvis.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-core1.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-core1.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-core1.png?raw=true',
      steps: [
        'SUPINE KNEE TO CHEST: Lie on back, draw one or both knees to chest to release lower back.',
        'BRIDGE LIFTS: Feet flat hip-width apart. Lift hips up, squeeze glutes, lower slowly. Repeat 10x.',
        'BIRD DOG: On hands and knees, extend right arm forward and left leg back. Hold, keep core tight. Switch.',
        'PLANK HOLD: High push-up position. Hands under shoulders, body in straight line. Hold 30-60s.',
        'SIDE PLANK LEG RAISE: On forearm, lift hips. Optionally lift top leg. Switch sides.'
      ]
    },
    {
      name: 'Core Series 2: Strength & Obliques',
      category: 'CORE & ABDOMEN',
      benefit: 'Builds Heat',
      description: 'Dynamic exercises to build heat, strengthen the obliques, and tone the abdominal wall.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-core2.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-core2.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-core2.png?raw=true',
      steps: [
        'STANDING SIDE BENDS: Stand tall, reach one arm over, slide other hand down leg. Feel the oblique stretch.',
        'SUPINE BICYCLE CRUNCHES: Lie on back, hands behind head. Elbow to opposite knee, extending other leg. Cycle.',
        'SUPINE LEG LOWERS: Legs straight up towards ceiling. Lower them slowly toward mat without arching back, lift up.',
        'HOLLOW BODY HOLD: Lie back, lift shoulders and legs slightly. Press lower back into mat. Hold.'
      ]
    },
    {
      name: 'Core Series 3: Release',
      category: 'CORE & ABDOMEN',
      benefit: 'Releases Back',
      description: 'A restorative movement to release tension in the spine and hips after core work.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-core3.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-core3.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-core3.png?raw=true',
      steps: [
        'WINDSHIELD WIPERS: Lie on your back, knees bent, feet wider than hips.',
        'Drop both knees to the right, then to the left.',
        'Continue this gentle rocking motion to release the lower back and hips.'
      ]
    },
    // HIPS & PELVIS
    {
      name: 'Hip & Pelvis Series 1: Mobility & Opening',
      category: 'HIPS & PELVIS',
      benefit: 'Opens Hips & Flexors',
      description: 'A dynamic sequence to lubricate the hip joints and open the adductors and hip flexors.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-hip1.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-hip1.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-hip1.png?raw=true',
      steps: [
        'HIP CIRCLES: Stand or kneel. Make large circles with hips, 5x each direction.',
        'BUTTERFLY POSE (Baddha Konasana): Soles together, knees wide. Hold feet, sit tall, gently flutter knees.',
        'LOW LUNGE (Anjaneyasana): Step one foot forward, lower back knee. Sink hips to stretch psoas.',
        'LIZARD POSE (Utthan Pristhasana): Bring both hands inside front foot. Heel-toe foot out. Deepen the lunge.'
      ]
    },
    {
      name: 'Hip & Pelvis Series 2: Deep Release',
      category: 'HIPS & PELVIS',
      benefit: 'Tension Release',
      description: 'Targeted stretches for the rotators and outer hips to release deep-seated tension.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-hip2.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-hip2.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-hip2.png?raw=true',
      steps: [
        'FIGURE FOUR STRETCH: Lie on back. Cross ankle over opposite knee. Clasp thigh and pull close.',
        '90-90 HIP SWITCHES: Sit with feet wide. Drop knees to one side (90-90 angles), then switch to the other.'
      ]
    },
    // LEGS & THIGHS
    {
      name: 'Leg Series',
      category: 'LEGS & THIGHS',
      benefit: 'Leg Strength',
      description: 'A comprehensive leg routine activating hamstrings, quads, and improving stability.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-leg.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-leg.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-leg.png?raw=true',
      steps: [
        'DOWNWARD-FACING DOG: Inverted V-shape to stretch the entire back body.',
        'PYRAMID POSE PREP: Hinge at hips with one leg forward to target hamstrings.',
        'LEG WINGS (Front-to-Back): Dynamic movement to loosen hip flexors.',
        'LEG WINGS (Side-to-Side): Dynamic lateral movement for adductors/abductors.',
        'CHAIR POSE: Sit back to activate quads and glutes.'
      ]
    },
    // KNEES & LOWER LEGS
    {
      name: 'Knee Series 1',
      category: 'KNEES & LOWER LEGS',
      benefit: 'Joint Strength',
      description: 'Strengthening and lubricating the knee joints with dynamic movements.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-knee.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-knee.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-knee.png?raw=true',
      steps: [
        'KNEE CIRCLES: Gentle rotations with hands on knees.',
        'CALF RAISES: Lift heels to strengthen calves.',
        'STANDING QUAD STRETCH: Pull heel to glute.',
        'LEG HIP ROTATION: Rotate the entire leg from the hip socket.',
        'SUMO SQUAT + CALF RAISES: Wide stance squat with heel lifts.',
        'PLIE SQUAT PULSES: Small pulsing movements in a wide squat.'
      ]
    },
    {
      name: 'Knee Series 2',
      category: 'KNEES & LOWER LEGS',
      benefit: 'Deep Mobility',
      description: 'Deep stretching and mobility work for the lower body.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-knee2.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-knee2.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-knee2.png?raw=true',
      steps: [
        'KNEE CIRCLES ROTATION: Additional knee joint lubrication.',
        'STANDING SINGLE KNEE TO CHEST: Balance and hip flexor compression.',
        'COSSACK SQUAT STRETCH: Side lunge for inner thighs and hamstrings.',
        'HAMSTRING STRETCH: Seated or standing forward fold variation.'
      ]
    },
    // ANKLES & FEET
    {
      name: 'Feet Series',
      category: 'ANKLES & FEET',
      benefit: 'Balance & Grounding',
      description: 'Foundation work for balance and foot health.',
      imageUrl: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-feet.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/women/warm-up/f-feet.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/arogya-resources/blob/main/public/men/warm-up/m-feet.png?raw=true',
      steps: [
        'ANGLE CIRCLES: Rotate ankles in both directions.',
        'FOOT FLEXION AND EXTENSION: Point and flex the toes.',
        'TOE STRETCH: Tuck toes under while kneeling.',
        'TOE SPLAYS AND SCRUNCHES: Spread toes wide, then curl them tightly.'
      ]
    }
  ];
}