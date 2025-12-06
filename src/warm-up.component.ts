import { ChangeDetectionStrategy, Component, output, signal, computed, input } from '@angular/core';
import { PoseDetailModalComponent } from './pose-detail-modal.component';
import { Pose } from './models/pose.model';

interface WarmUpExercise {
  name: string;
  category: string;
  description: string;
  imageUrl: string; // Fallback
  imageUrlFemale?: string;
  imageUrlMale?: string;
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
        <!-- Warm-up overview section -->
        <section class="mb-16 bg-black/30 border border-white/5 rounded-xl p-8">
            <h2 class="text-center text-3xl font-bold text-[#F4F4F8] mb-8">Full Warm-Up Library</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 text-sm">
                @for(category of exerciseCategories(); track category.name) {
                    <div>
                        <h3 class="font-bold text-[#A0E8C8] mb-3 text-base border-b border-[#A0E8C8]/20 pb-2">{{ category.name }}</h3>
                        <ul class="space-y-2">
                            @for(exercise of category.exercises; track exercise.name) {
                                <li class="text-[#B8B8C4]">{{ exercise.name }}</li>
                            }
                        </ul>
                    </div>
                }
            </div>
        </section>

        <!-- Warm-up cards -->
        @for(category of exerciseCategories(); track category.name) {
          <section [id]="category.name" class="mb-16">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-[#F4F4F8]">{{ category.name }}</h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              @for(exercise of category.exercises; track exercise.name) {
                <div (click)="openModal(exercise)" 
                     class="group relative transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
                  <div class="holo-border-container h-full">
                    <div class="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl h-full shadow-lg shadow-black/30 flex flex-col">
                      <figure class="aspect-[4/3] overflow-hidden rounded-t-xl">
                        <img [src]="gender() === 'male' && exercise.imageUrlMale ? exercise.imageUrlMale : (exercise.imageUrlFemale || exercise.imageUrl)" [alt]="exercise.name" width="400" height="300" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </figure>
                      <div class="p-5 flex flex-col flex-grow">
                        <div>
                          <h3 class="text-lg font-bold text-[#F4F4F8]">{{ exercise.name }}</h3>
                        </div>
                        <div class="mt-auto pt-4">
                          <span class="inline-block bg-gradient-to-r from-[#A0E8C8]/5 to-[#A0C8E8]/5 border border-[#A0E8C8]/20 text-[#A0E8C8] text-xs font-medium px-3 py-1 rounded-full">
                            {{ exercise.category }}
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

  selectedExerciseIndex = signal<number | null>(null);

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

  readonly selectedExercise = computed(() => {
    const index = this.selectedExerciseIndex();
    if (index === null) {
      return null;
    }
    const exercise = this.warmUpExercises[index];
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
    // EYES
    {
      name: 'Eye Warm-Up Series',
      category: 'EYES',
      description: 'A comprehensive series of movements to strengthen eye muscles, relieve strain from screen time, and improve focus, peripheral awareness, and overall ocular coordination.',
      imageUrl: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-eye.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-eye.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/warm-up/m-eye.png?raw=true',
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
      name: 'Lion\'s Breath (Simhasana)',
      category: 'FACE & JAW',
      description: 'Releasing tension in the jaw, face, and throat while activating facial muscles.',
      imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/11/Lion-Pose_Andrew-Clark_2400x1350-1.jpg',
      steps: [
        'Kneel or sit comfortably.',
        'Inhale deeply through your nose.',
        'Exhale forcefully through your mouth, making a "ha" sound.',
        'Simultaneously, open your mouth wide, stick your tongue out towards your chin, and gaze upwards.',
        'Repeat 3-5 times.'
      ]
    },
    {
      name: 'Jaw Circles',
      category: 'FACE & JAW',
      description: 'Releasing the masseter and temporalis muscles, relieving TMJ tension.',
      imageUrl: 'https://i.ytimg.com/vi/EM18yA08G98/maxresdefault.jpg',
      steps: [
        'Sit comfortably with your mouth gently closed.',
        'Slowly move your lower jaw in a circular motion.',
        'Complete 5 circles clockwise, then 5 circles counterclockwise.',
        'Keep the movement gentle and relaxed.'
      ]
    },
    {
      name: 'Facial Massage',
      category: 'FACE & JAW',
      description: 'Self-massage of the forehead, temples, cheeks, and jawline to release fascial tension.',
      imageUrl: 'https://media.self.com/photos/61dee0705a7698334b5c3bf7/master/w_1600%2Cc_limit/face-yoga-forehead.gif',
      steps: [
        'Using your fingertips, gently massage your forehead in circular motions.',
        'Move to your temples and continue the gentle massage.',
        'Massage your cheeks, jawline, and the area around your mouth.',
        'Breathe deeply and relax your facial muscles.'
      ]
    },
    // HEAD & NECK
    {
      name: 'Head & Neck Series',
      category: 'HEAD & NECK',
      description: 'A complete sequence to release tension, improve flexibility, and correct posture in the neck and upper shoulders.',
      imageUrl: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-head.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-head.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/warm-up/m-head.png?raw=true',
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
      description: 'A comprehensive routine combining dynamic rotations, static stretches, and activation poses to fully prepare the shoulder girdle, improve mobility, and build stability for your practice.',
      imageUrl: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-shoulder.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-shoulder.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/warm-up/m-shoulder.png?raw=true',
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
      description: 'A complete sequence to lubricate joints, increase flexibility, and activate the muscles from your fingertips to your elbows, preparing them for weight-bearing poses.',
      imageUrl: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-wrist.png?raw=true',
      imageUrlFemale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/women/warm-up/f-wrist.png?raw=true',
      imageUrlMale: 'https://github.com/albindavidc/Arogya-Resources/blob/main/public/men/warm-up/m-wrist.png?raw=true',
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
      name: 'Cat-Cow Pose',
      category: 'SPINE & TORSO',
      description: 'Dynamic spinal flexion and extension that warms the entire vertebral column.',
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
      category: 'SPINE & TORSO',
      description: 'Warms up the thoracic spine, obliques, and intercostal muscles.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/01/seated-torso-twist-exercise-illustration.jpg',
      steps: [
        'Sit comfortably on the floor with your legs crossed.',
        'Place your right hand on your left knee and your left hand on the floor behind you.',
        'Inhale to lengthen your spine, exhale to gently twist to the left.',
        'Hold for a few breaths, then repeat on the other side.'
      ]
    },
    {
      name: 'Standing Side Bends',
      category: 'SPINE & TORSO',
      description: 'Lateral spinal flexion that lengthens the quadratus lumborum, obliques, and intercostals.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/side-bend-stretch-exercise-illustration.jpg',
      steps: [
        'Stand tall with your feet hip-width apart.',
        'Raise your right arm overhead.',
        'Gently bend your torso to the left, feeling a stretch along your right side.',
        'Hold for 15-20 seconds, then switch sides.'
      ]
    },
    {
      name: 'Spinal Waves',
      category: 'SPINE & TORSO',
      description: 'Fluid undulating movements through the entire spine, awakening segmental vertebral articulation.',
      imageUrl: 'https://i.ytimg.com/vi/qDwYx-S2D6A/maxresdefault.jpg',
      steps: [
        'Start in a tabletop position.',
        'Initiate a wave from your tailbone, moving sequentially through your spine to your head, like a Cat-Cow flow.',
        'Make the movement fluid and continuous.',
        'Explore forward and backward waves for 30-60 seconds.'
      ]
    },
    {
      name: 'Pelvic Tilts',
      category: 'SPINE & TORSO',
      description: 'Gentle tilting that warms the lumbar spine and activates the deep core.',
      imageUrl: 'https://www.verywellhealth.com/thmb/x-OR1FBC9Yg6A_QDp9GjPz9-L1s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-01-2696365-PelvicTilt-5994a2f803f4020010ddff17.gif',
      steps: [
        'Lie on your back with your knees bent and feet flat on the floor.',
        'Gently flatten your lower back against the floor by engaging your core (posterior tilt).',
        'Relax and allow a small arch to form in your lower back (anterior tilt).',
        'Repeat this gentle rocking motion 10-15 times.'
      ]
    },
    // CORE & ABDOMEN
    {
      name: 'Supine Knee-to-Chest',
      category: 'CORE & ABDOMEN',
      description: 'Gentle compression that massages the abdominal organs and releases the lower back.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/11/Knees-to-Chest-Pose_Andrew-Clark_2400x1350-1-e1637599052695.jpeg',
      steps: [
        'Lie on your back.',
        'Exhale and draw both knees to your chest.',
        'Clasp your hands around your shins or thighs.',
        'Gently rock side-to-side to massage your lower back. Hold for 30-60 seconds.'
      ]
    },
    {
      name: 'Reclined Twists',
      category: 'CORE & ABDOMEN',
      description: 'Rotational stretch for the obliques, spinal erectors, and outer hips.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/12/Supine-Spinal-Twist_Andrew-Clark_2400x1350-1.jpeg',
      steps: [
        'Lie on your back and draw your knees to your chest.',
        'Extend your arms out to a "T" shape.',
        'Gently drop both knees to the right side, keeping your left shoulder on the ground.',
        'Hold for 30 seconds, then repeat on the other side.'
      ]
    },
    {
      name: 'Bridge Lifts',
      category: 'CORE & ABDOMEN',
      description: 'Dynamic pelvic lifts that warm the glutes, hamstrings, and spinal extensors.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/10/Bridge-Pose_Andrew-Clark_2400x1350-e1633534570119.jpeg',
      steps: [
        'Lie on your back, knees bent, feet flat and hip-width apart.',
        'Inhale and lift your hips off the floor.',
        'Exhale and slowly lower your hips back down.',
        'Repeat this dynamic lift 10-15 times.'
      ]
    },
    // HIPS & PELVIS
    {
      name: 'Hip Circles',
      category: 'HIPS & PELVIS',
      description: 'Standing or tabletop circular movements that lubricate the acetabulofemoral joint.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/hip-circles-exercise-illustration.jpg',
      steps: [
        'Stand with feet hip-width apart, hands on your hips.',
        'Gently push your hips forward, then circle them to the right, back, and left.',
        'Make 5-8 large, slow circles in one direction, then switch.'
      ]
    },
    {
      name: 'Butterfly Pose (Baddha Konasana)',
      category: 'HIPS & PELVIS',
      description: 'Opens the inner thighs and groin, warming the hip adductors.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/09/Bound-Angle-Pose_Andrew-Clark_2400x1350-2-e1632338601839.jpeg',
      steps: [
        'Sit on the floor with the soles of your feet together and your knees out to the sides.',
        'Hold onto your feet or ankles.',
        'Sit tall, and gently flap your knees like a butterfly\'s wings for 20-30 seconds.',
        'For a deeper stretch, hinge forward at the hips.'
      ]
    },
    {
      name: 'Figure Four Stretch',
      category: 'HIPS & PELVIS',
      description: 'Targets the piriformis and deep external hip rotators, releasing tension.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/11/Eye-of-the-Needle-Pose_Andrew-Clark_2400x1350-1.jpeg',
      steps: [
        'Lie on your back with knees bent.',
        'Cross your right ankle over your left knee.',
        'Reach through and clasp your hands behind your left thigh.',
        'Gently pull the left leg towards you. Hold for 30 seconds and switch sides.'
      ]
    },
    {
      name: 'Low Lunge (Anjaneyasana)',
      category: 'HIPS & PELVIS',
      description: 'Deep hip flexor stretch warming the psoas, iliacus, and rectus femoris.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/10/Low-Lunge_Andrew-Clark_2400x1350-2-e1634063715694.jpeg',
      steps: [
        'From a tabletop position, step your right foot forward between your hands.',
        'Slide your left knee back until you feel a comfortable stretch in your hip flexor.',
        'Keep your front knee stacked over your ankle.',
        'Hold for 30 seconds, then switch sides.'
      ]
    },
    {
      name: 'Lizard Pose (Utthan Pristhasana)',
      category: 'HIPS & PELVIS',
      description: 'Intensified hip opener targeting the hip flexors, adductors, and groin region.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2022/01/Lizard-Pose_Andrew-Clark_2400x1350-2.jpeg',
      steps: [
        'From a low lunge, place both hands on the inside of your front foot.',
        'Heel-toe your front foot out to the edge of your mat.',
        'Stay on your hands or lower down to your forearms for a deeper stretch.',
        'Hold for 30 seconds and switch sides.'
      ]
    },
    {
      name: '90-90 Hip Switches',
      category: 'HIPS & PELVIS',
      description: 'Dynamic internal and external rotation transitions that warm all planes of hip movement.',
      imageUrl: 'https://i.ytimg.com/vi/a_23Gj8l-vY/maxresdefault.jpg',
      steps: [
        'Sit on the floor with your knees bent and feet wider than your hips.',
        'Gently drop both knees to the right side, aiming for 90-degree angles.',
        'Lift your knees back to the center and switch, dropping them to the left.',
        'Continue this fluid "windshield wiper" motion for 30-60 seconds.'
      ]
    },
    // LEGS & THIGHS
    {
      name: 'Downward-Facing Dog',
      category: 'LEGS & THIGHS',
      description: 'Full-body stretch energizing the arms, shoulders, spine, hamstrings, and calves.',
      imageUrl: 'https://cdn.yogajournal.com/wp-content/uploads/2021/11/Downward-Facing-Dog_Andrew-Clark_2400x1350-2.jpg',
      steps: [
        'From tabletop, curl your toes and lift your hips up and back.',
        'Form an inverted "V" shape with your body.',
        'Press your hands firmly into the mat and keep your head between your upper arms.',
        '"Pedal" your feet by bending one knee and then the other to stretch your hamstrings.'
      ]
    },
    {
      name: 'Standing Forward Fold',
      category: 'LEGS & THIGHS',
      description: 'Lengthens the entire posterior chain including hamstrings, calves, and spinal erectors.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/11/Standing-Forward-Bend_Andrew-Clark_2400x1350-1-e1637603373199.jpeg',
      steps: [
        'Stand with feet hip-width apart.',
        'Exhale and hinge at your hips, keeping your back straight.',
        'Let your head hang heavy and bend your knees as much as needed.',
        'Hold for 30 seconds, breathing into your hamstrings.'
      ]
    },
    {
      name: 'Pyramid Pose Prep',
      category: 'LEGS & THIGHS',
      description: 'Targeted hamstring and calf stretch with hip-squaring alignment.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/10/Pyramid-Pose_Andrew-Clark_2400x1350-2.jpeg',
      steps: [
        'Take a staggered stance, right foot forward, left foot back about 3 feet.',
        'Square your hips to the front.',
        'Hinge at your hips and fold over your front leg with a flat back.',
        'Hold for 20-30 seconds and switch sides.'
      ]
    },
    {
      name: 'Leg Swings (Front-to-Back)',
      category: 'LEGS & THIGHS',
      description: 'Dynamic movements warming the hip flexors and hamstrings.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/01/front-and-back-leg-swings-exercise-illustration.jpg',
      steps: [
        'Stand holding onto a wall or chair for support.',
        'Swing your right leg forward and backward in a controlled motion.',
        'Keep your torso upright and core engaged.',
        'Perform 10-15 swings, then switch legs.'
      ]
    },
    {
      name: 'Leg Swings (Side-to-Side)',
      category: 'LEGS & THIGHS',
      description: 'Lateral dynamic stretches warming the adductors and abductors.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/01/side-leg-swings-exercise-illustration.jpg',
      steps: [
        'Stand facing a wall or chair for support.',
        'Swing your right leg from side to side in front of your body.',
        'Keep the movement controlled, focusing on the inner and outer thigh.',
        'Perform 10-15 swings, then switch legs.'
      ]
    },
    {
      name: 'Chair Pose (Utkatasana)',
      category: 'LEGS & THIGHS',
      description: 'Activates and warms the quadriceps, glutes, and core while building heat.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/10/Chair-Pose_Andrew-Clark_2400x1350-1-e1633537299395.jpeg',
      steps: [
        'Stand with feet together or hip-width apart.',
        'Inhale and raise your arms overhead.',
        'Exhale and bend your knees, sitting back as if in an imaginary chair.',
        'Keep your core engaged and chest lifted. Hold for 20-30 seconds.'
      ]
    },
    // KNEES & LOWER LEGS
    {
      name: 'Knee Circles',
      category: 'KNEES & LOWER LEGS',
      description: 'Gentle rotational movements lubricating the knee joint.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/02/knee-circles-exercise-illustration.jpg',
      steps: [
        'Stand with your feet together and bend your knees slightly.',
        'Place your hands on your knees.',
        'Gently rotate your knees in a circular motion.',
        'Perform 10 circles clockwise, then 10 counterclockwise.'
      ]
    },
    {
      name: 'Calf Raises',
      category: 'KNEES & LOWER LEGS',
      description: 'Activates the gastrocnemius and soleus, warming the Achilles tendon.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/calf-raises-exercise-illustration.jpg',
      steps: [
        'Stand with your feet hip-width apart.',
        'Slowly raise your heels off the ground, coming onto the balls of your feet.',
        'Hold for a moment at the top, then slowly lower your heels back down.',
        'Repeat 15-20 times.'
      ]
    },
    {
      name: 'Standing Quad Stretch',
      category: 'KNEES & LOWER LEGS',
      description: 'Lengthens the quadriceps and hip flexors while improving balance.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/standing-quad-stretch-exercise-illustration.jpg',
      steps: [
        'Stand on one leg, holding onto a wall for balance if needed.',
        'Grab your right foot with your right hand and gently pull your heel towards your glute.',
        'Keep your knees together and stand up tall.',
        'Hold for 20-30 seconds, then switch legs.'
      ]
    },
    // ANKLES & FEET
    {
      name: 'Ankle Circles',
      category: 'ANKLES & FEET',
      description: 'Rotational movements lubricating the talocrural joint.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2015/01/ankle-circles-exercise-illustration.jpg',
      steps: [
        'Sit on the floor or in a chair.',
        'Extend one leg and slowly rotate your ankle in a circle.',
        'Make 10 circles in one direction, then 10 in the other.',
        'Repeat with the other ankle.'
      ]
    },
    {
      name: 'Toe Stretch (Kneeling)',
      category: 'ANKLES & FEET',
      description: 'Extends and warms the plantar fascia, toe flexors, and intrinsic foot muscles.',
      imageUrl: 'https://www.yogajournal.com/wp-content/uploads/2021/12/Toes-Pose_Andrew-Clark_2400x1350-1.jpeg',
      steps: [
        'Kneel on the floor with your toes tucked under.',
        'Gently sit back on your heels.',
        'You should feel a deep stretch in the soles of your feet.',
        'Hold for 20-40 seconds.'
      ]
    },
    {
      name: 'Foot Flexion and Extension',
      category: 'ANKLES & FEET',
      description: 'Alternating dorsiflexion and plantarflexion to warm the tibialis anterior and calf muscles.',
      imageUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/ankle-dorsiflexion-plantar-flexion-exercise-illustration.jpg',
      steps: [
        'Sit with your legs extended in front of you.',
        'Point your toes away from you (plantarflexion) and hold for 5 seconds.',
        'Flex your feet, pulling your toes back towards you (dorsiflexion) and hold for 5 seconds.',
        'Repeat 10-15 times.'
      ]
    },
    {
      name: 'Toe Splays and Scrunches',
      category: 'ANKLES & FEET',
      description: 'Activates the intrinsic foot muscles, improving foot dexterity and grounding awareness.',
      imageUrl: 'https://i.ytimg.com/vi/b3f-D-igk2U/maxresdefault.jpg',
      steps: [
        'Sit or stand comfortably.',
        'Lift your toes and spread them as wide apart as possible. Hold for 5 seconds.',
        'Lower your toes and then scrunch them, as if trying to pick up a towel. Hold for 5 seconds.',
        'Repeat this sequence 5-10 times.'
      ]
    }
  ];
}
