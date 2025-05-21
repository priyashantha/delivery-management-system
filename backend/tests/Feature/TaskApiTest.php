<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_a_task()
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'Sample Task',
            'content' => 'Sample content',
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'Sample Task']);

        $this->assertDatabaseHas('task', ['title' => 'Sample Task']);
    }

    #[Test]
    public function it_requires_a_title()
    {
        $response = $this->postJson('/api/tasks', [
            'content' => 'No title',
        ]);

        $response->assertStatus(422);
    }

    #[Test]
    public function it_returns_latest_5_incomplete_tasks()
    {
        Task::factory()->count(6)->create(['completed' => false]);
        Task::factory()->create(['completed' => true]); // should be excluded

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $this->assertCount(5, $response->json());
    }

    #[Test]
    public function it_marks_a_task_as_completed()
    {
        $task = Task::factory()->create(['completed' => false]);

        $response = $this->patchJson("/api/tasks/{$task->id}");

        $response->assertStatus(200);
        $this->assertDatabaseHas('task', ['id' => $task->id, 'completed' => true]);
    }

    #[Test]
    public function it_returns_404_for_invalid_task_on_update()
    {
        $response = $this->patchJson('/api/tasks/9999');
        $response->assertStatus(404);
    }
}
